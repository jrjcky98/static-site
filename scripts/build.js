const { compile } = require("../static/webpack/helpers/compileWebpack");
const {
  makeWebpackConfig,
} = require("../static/webpack/helpers/makeWebpackConfig");
const fs = require("fs");

function compileWebpack() {
  if (fs.existsSync("build")) {
    fs.rmSync("build", { recursive: true });
  }

  if (fs.existsSync(".static")) {
    fs.rmSync(".static", { recursive: true });
  }

  const wpConfig = makeWebpackConfig({
    production: true,
  });

  const wpServerConfig = makeWebpackConfig({
    server: true,
  });

  compile([wpConfig, wpServerConfig])
    .then(() => {
      if (fs.existsSync(".static")) {
        const buildTemplate = require("../.static/server/index.js").default;
        buildTemplate();
      }

      console.log("Success! Compiled in `build` folder");
    })
    .catch((err) => {
      console.error(err);
    });
}

function init() {
  compileWebpack();
}

init();
