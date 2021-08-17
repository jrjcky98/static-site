const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackCommon = require("./common");
const loaders = require("./loaders");
const TerserPlugin = require("terser-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { getPublicPathEnv, getCurrentEnvFile } = require("./env");

const webpackProd = (env) => {
  const currentEnvFile = getCurrentEnvFile(env);
  const pathEnvFile = path.resolve(__dirname, "..", currentEnvFile);
  const publicPathURL = getPublicPathEnv(pathEnvFile);

  return {
    mode: "production",
    output: {
      filename: "static/js/[name].[contenthash].js",
      path: path.resolve(__dirname, "..", "build"),
      publicPath: publicPathURL,
    },
    plugins: [
      new copyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            globOptions: {
              ignore: [
                // Ignore all `txt` files
                "**/*index.html",
              ],
            },
          },
        ],
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        name: false,
      },
      // Gathered from CRA webpack config
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
      minimize: true,
      minimizer: [
        // This is only used in production mode
        // Gathered from CRA webpack config
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  };
};

module.exports = (env) =>
  merge(
    webpackProd(env),
    webpackCommon(env),
    loaders.loadFiles({
      options: {
        name: "static/media/[name].[ext]",
      },
    }),
    loaders.extractCSS({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    loaders.loadJavaScript(),
    loaders.loadPreESLint()
  );
