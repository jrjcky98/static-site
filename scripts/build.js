const { compile } = require("./common");
const fs = require("fs");
const prodWebpackConfig = require("../static/webpack/prod");

function init() {
  if (fs.existsSync("build")) {
    fs.rmSync("build", { recursive: true });
  }

  compile([prodWebpackConfig({ production: true })])
    .then(() => {
      console.log("Success! Compiled in `build` folder");
    })
    .catch((err) => {
      console.error(err);
    });
}

init();
