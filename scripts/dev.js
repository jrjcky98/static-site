require("../static/binHelper");

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { buildTemplate } = require("../static/buildTemplate");
const {
  makeWebpackConfig,
} = require("../static/webpack/helpers/makeWebpackConfig");

const htmlTemplate = buildTemplate();
const wpConfig = makeWebpackConfig({
  development: true,
  HTML_TEMPLATE: htmlTemplate,
});

const compiler = webpack(wpConfig);
const server = express();
const port = 3000;

server.use(webpackDevMiddleware(compiler));

server.use(
  webpackHotMiddleware(compiler, {
    path: "/__webpack_hmr",
    heartbeat: 4000,
  })
);

server.listen(port, () => {
  console.log(`Example App listening at http://localhost:${port}`);
});
