const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const devWebpackConfig = require("../static/webpack/dev");

const compiler = webpack(devWebpackConfig({ development: true }));
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
