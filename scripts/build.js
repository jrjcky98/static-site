require("../static/binHelper");

const { compile } = require("../static/webpack/helpers/compileWebpack");
const {
  makeWebpackConfig,
} = require("../static/webpack/helpers/makeWebpackConfig");
const fs = require("fs");
const { buildTemplate } = require("../static/buildTemplate");

function compileWebpack() {
  if (fs.existsSync("build")) {
    fs.rmSync("build", { recursive: true });
  }

  const htmlTemplate = buildTemplate();
  const wpConfig = makeWebpackConfig({
    production: true,
    HTML_TEMPLATE: htmlTemplate,
  });

  compile([wpConfig])
    .then(() => {
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
