const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { getPathConfig } = require("../getConfig");
const webpackCommon = require("./common");
const loaders = require("./loaders");

const webpackDev = {
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
    getPathConfig("src/index.tsx"),
  ],
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
