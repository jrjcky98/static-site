const r = require.resolve;

require("@babel/register")({
  extensions: [".js", ".ts", ".tsx", ".mdx"],
  presets: [
    [
      r("@babel/preset-env"),
      {
        targets: {
          node: "current",
        },
      },
    ],
    [
      r("@babel/preset-react"),
      {
        runtime: "automatic",
      },
    ],
    [r("@babel/preset-typescript")],
  ],
  plugins: [
    [
      "css-modules-transform",
      {
        extensions: [".css"],
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
    ],
    "dynamic-import-node",
  ],
});

// necessary at any entry point of the cli to ensure that Babel-register
// does not attempt to transform non JavaScript files.
const ignoredExtensions = ["css", "mdx"];
ignoredExtensions.forEach((ext) => {
  require.extensions[`.${ext}`] = () => {};
});
