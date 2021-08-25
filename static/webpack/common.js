const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { getCurrentEnvFile } = require("@epic-form/epic-dev-utils/env");
const { getPathConfig } = require("../getConfig");

module.exports = (param) => {
  const { HTML_TEMPLATE } = param;
  const currentEnvFile = getCurrentEnvFile(param);
  return {
    resolve: {
      extensions: [".js", ".json", ".tsx", ".ts"],
    },
    plugins: [
      new CleanWebpackPlugin(),
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
      new Dotenv({
        path: getPathConfig(currentEnvFile),
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
    ],
  };
};
