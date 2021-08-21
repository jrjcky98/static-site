const { merge } = require("webpack-merge");
const { getPathConfig } = require("../getConfig");
const webpackCommon = require("./common");
const loaders = require("./loaders");

const webpackDev = {
  mode: "development",
  output: {
    filename: "main.js",
    path: getPathConfig("build"),
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: getPathConfig("public"),
    disableHostCheck: true,
    port: 3018,
    host: "localhost",
    open: true,
  },
};

module.exports = (param) =>
  merge(
    webpackDev,
    webpackCommon(param),
    loaders.extractCSS(),
    loaders.loadFiles({
      options: {
        name: "[name].[ext]",
      },
    }),
    loaders.loadJavaScript(),
    loaders.loadPreESLint()
  );
