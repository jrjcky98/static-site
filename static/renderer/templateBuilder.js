import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import { StaticRouter } from "react-router-dom";
import App from "../../src/App";
import { buildRoutes, baseBuildPath } from "./routesBuilder";

function buildTemplate() {
  const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
  const { routePath } = buildRoutes();

  routePath.forEach((route) => {
    const { html, constructedStyle, styleTags, linkTags, scriptTags } =
      buildExtractorHTML(route);

    const buildHTMLPath = `${baseBuildPath}${route}/index.html`;

    const replacedTemplate = htmlFile
      .replace("%HTML_BODY%", html)
      .replace("%HTML_SCRIPTS%", scriptTags)
      .replace("%HTML_STYLES%", styleTags + constructedStyle)
      .replace("%HTML_LINK%", linkTags);

    fs.writeFileSync(buildHTMLPath, replacedTemplate);
  });

  // todo: minify html and optimizations
}

function buildExtractorHTML(currentPath = "/") {
  const webStats = path.resolve(__dirname, "../../build/loadable-stats.json");

  const key = "custom";
  const cache = createCache({ key });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const extractor = new ChunkExtractor({ statsFile: webStats });
  const appElement = (
    <CacheProvider value={cache}>
      <StaticRouter location={currentPath}>
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
    .replace("%HTML_SCRIPTS%", "")
    .replace("%HTML_STYLES%", "")
    .replace("%HTML_LINK%", "");

  return replacedTemplate;
}

export { buildTemplate, buildDevTemplate };
