const webpackNodeExternals = require("webpack-node-externals");
const { getPathConfig } = require("../../getConfig");

module.exports = {
  target: "node",
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".md", ".mdx"],
  },
  node: {
    __dirname: true,
  },
  entry: getPathConfig("static/renderer/index.js"),
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "current",
                  },
                },
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
              "@babel/preset-typescript",
            ],
            plugins: [
              "@loadable/babel-plugin",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
      {
        test: /\.mdx$/,
        use: ["babel-loader", "@mdx-js/loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "index.js",
    path: getPathConfig(".static/server"),
    libraryTarget: "commonjs2",
  },
};
