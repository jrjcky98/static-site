const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { getCurrentEnvFile } = require("@epic-form/epic-dev-utils/env");
const { getPathConfig } = require("../../getConfig");

module.exports = (param) => {
  const currentEnvFile = getCurrentEnvFile(param);
  return {
    resolve: {
      extensions: [".js", ".json", ".tsx", ".ts", ".md", ".mdx"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        path: getPathConfig(currentEnvFile),
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
    ],
  };
};
