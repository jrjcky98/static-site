const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const { ChunkExtractor } = require("@loadable/server");
const { CacheProvider } = require("@emotion/react");
const createEmotionServer = require("@emotion/server/create-instance").default;
const createCache = require("@emotion/cache").default;
const { StaticRouter } = require("react-router-dom");

const App = require("../src/App").default;

function buildTemplate() {
  const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

  const { html, constructedStyle, styleTags, linkTags, scriptTags } =
    buildExtractorHTML();
  const replacedTemplate = htmlFile
    .replace("%HTML_BODY%", html + scriptTags)
    .replace("%HTML_STYLES%", styleTags + constructedStyle)
    .replace("%HTML_LINK%", linkTags);

  fs.writeFileSync("build/index.html", replacedTemplate);
}

function buildExtractorHTML() {
  const webStats = path.resolve(__dirname, "../build/loadable-stats.json");

  const key = "custom";
  const cache = createCache({ key });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const extractor = new ChunkExtractor({ statsFile: webStats });
  const appElement = (
    <CacheProvider value={cache}>
      <StaticRouter location="/">
        <App />
      </StaticRouter>
    </CacheProvider>
  );

  const jsx = extractor.collectChunks(appElement);

  const { styles, html } = extractCriticalToChunks(
    ReactDOMServer.renderToString(jsx)
  );
  const constructedStyle = constructStyleTagsFromChunks({ html, styles });

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  return {
    html,
    scriptTags,
    linkTags,
    styleTags,
    constructedStyle,
  };
}

function buildDevTemplate() {
  const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

  const replacedTemplate = htmlFile
    .replace("%HTML_BODY%", "")
    .replace("%HTML_STYLES%", "")
    .replace("%HTML_LINK%", "");

  return replacedTemplate;
}

module.exports = {
  buildTemplate,
  buildDevTemplate,
};
