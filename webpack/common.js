const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { getCurrentEnvFile } = require("@epic-form/epic-dev-utils/env");

module.exports = (param) => {
  const currentEnvFile = getCurrentEnvFile(param);
  return {
    entry: path.resolve(__dirname, "..", "src", "index.tsx"),
    resolve: {
      extensions: [".js", ".json", ".tsx", ".ts"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "..", "public", "index.html"),
        favicon: path.resolve(__dirname, "..", "public", "favicon.ico"),
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
        path: path.resolve(__dirname, "..", currentEnvFile),
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
    ],
  };
};
