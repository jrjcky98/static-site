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
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-runtime"],
  ],
};
