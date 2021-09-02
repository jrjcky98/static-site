const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { getPathConfig } = require("../getConfig");
const webpackCommon = require("./common");
const loaders = require("./loaders");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackDev = (param) => {
  const { HTML_TEMPLATE } = param;
  return {
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        templateContent: HTML_TEMPLATE,
        favicon: getPathConfig("public/favicon.ico"),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  };
};

module.exports = (param) =>
  merge(
    webpackDev(param),
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
