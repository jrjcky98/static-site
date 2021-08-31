const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { getPathConfig } = require("../getConfig");

exports.extractCSS = ({ options = {}, filename = "[name].css" } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
          // If you distribute your code as a package and want to
          // use _Tree Shaking_, then you should mark CSS extraction
          // to emit side effects. For most use cases, you don't
          // have to worry about setting flag.
          sideEffects: true,
        },
      ],
    },
    plugins: [
      /**
       * Using MiniCssExtractPlugin with styling solves the problem of Flash of Unstyled Content (FOUC).
       * Separating CSS from JavaScript also improves caching behavior and removes a potential attack vector.
       */
      new MiniCssExtractPlugin({
        filename,
      }),
    ],
  };
};

exports.loadFiles = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|md|svg)$/,
        include,
        exclude,
        use: {
          loader: "file-loader",
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: getPathConfig("src"),
        use: "babel-loader",
      },
    ],
  },
});

exports.loadPreESLint = () => ({
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              cache: true,
              eslintPath: require.resolve("eslint"),
              resolvePluginsRelativeTo: __dirname,
            },
            loader: require.resolve("eslint-loader"),
          },
        ],
        include: getPathConfig("src"),
      },
    ],
  },
});
