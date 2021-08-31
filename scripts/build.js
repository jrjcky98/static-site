require("../static/binHelper");

const { compile } = require("../static/webpack/helpers/compileWebpack");
const {
  makeWebpackConfig,
} = require("../static/webpack/helpers/makeWebpackConfig");
const fs = require("fs");
const { buildTemplate } = require("../static/templateBuilder");

function compileWebpack() {
  if (fs.existsSync("build")) {
    fs.rmSync("build", { recursive: true });
  }

  const wpConfig = makeWebpackConfig({
    production: true,
  });

  compile([wpConfig])
    .then(() => {
      buildTemplate();
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
