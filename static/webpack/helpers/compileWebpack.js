const webpack = require("webpack");
const chalk = require("chalk");

function compile(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run(async (err, stats) => {
      if (err) {
        console.log(chalk.red(err.stack || err));
        if (err.details) {
          console.log(chalk.red(err.details));
        }
        return reject(err);
      }

      stats.toJson("verbose");

      const [prodStats] = stats.stats;
      checkBuildStats("prod", prodStats);

      function checkBuildStats(stage, stageStats) {
        const buildErrors = stageStats?.hasErrors();
        const buildWarnings = stageStats?.hasWarnings();

        if (buildErrors || buildWarnings) {
          console.log(
            stageStats.toString({
              performance: false,
              hash: false,
              timings: true,
              entrypoints: false,
              chunkOrigins: false,
              chunkModules: false,
              colors: chalk.supportsColor,
            })
          );
          if (buildErrors) {
            console.log(
              chalk.red.bold(`
                => There were ERRORS during the ${stage} build stage! :(
                => Fix them and try again!
              `)
            );
          } else if (buildWarnings) {
            console.log(
              chalk.yellow(`
=> There were WARNINGS during the ${stage} build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.
`)
            );
          }
        }
      }

      resolve();
    });
  });
}

module.exports = {
  compile,
};
