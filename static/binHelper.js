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

// necessary at any entry point of the cli to ensure that Babel-register
// does not attempt to transform non JavaScript files.
const ignoredExtensions = [
  "css",
  "scss",
  "styl",
  "less",
  "png",
  "gif",
  "jpg",
  "jpeg",
  "svg",
  "woff",
  "woff2",
  "ttf",
  "eot",
  "otf",
  "mp4",
  "webm",
  "ogg",
  "mp3",
  "wav",
  "md",
  "yaml",
];
ignoredExtensions.forEach((ext) => {
  require.extensions[`.${ext}`] = () => {};
});
