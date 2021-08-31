const r = require.resolve;

require("@babel/register")({
  extensions: [".js", ".ts", ".tsx"],
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
