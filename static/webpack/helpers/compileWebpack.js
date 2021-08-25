const webpack = require("webpack");

function compile(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      if (err) {
        throw new Error(err);
      }

      if (stats.hasErrors()) {
        throw new Error(stats.toJson().errors);
      }

      resolve();
    });
  });
}

module.exports = {
  compile,
};
