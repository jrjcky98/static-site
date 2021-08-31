let babelPresetOpt = {
  modules: false,
};

if (process.env.NODE_ENV === "test") {
  babelPresetOpt = {
    targets: {
      node: "current",
    },
  };
}

module.exports = {
  presets: [
    ["@babel/preset-env", babelPresetOpt],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    ["@loadable/babel-plugin"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-runtime"],
  ],
};
