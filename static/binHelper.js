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
    [r("@babel/preset-react")],
    [r("@babel/preset-typescript")],
  ],
  plugins: ["dynamic-import-node"],
});
