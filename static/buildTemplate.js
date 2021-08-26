const fs = require("fs");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const App = require("../src/App").default;

const { CacheProvider } = require("@emotion/react");
const createEmotionServer = require("@emotion/server/create-instance").default;
const createCache = require("@emotion/cache").default;

function buildTemplate() {
  const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

  const { html, constructedStyle } = buildReactDOM();
  const replacedTemplate = htmlFile
    .replace("%HTML_BODY%", html)
    .replace("%HTML_STYLES%", constructedStyle);

  return replacedTemplate;
}

function buildReactDOM() {
  const key = "custom";
  const cache = createCache({ key });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const { html, styles } = extractCriticalToChunks(
    ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    )
  );
  const constructedStyle = constructStyleTagsFromChunks({ html, styles });

  return { html, constructedStyle };
}

module.exports = {
  buildTemplate,
};
