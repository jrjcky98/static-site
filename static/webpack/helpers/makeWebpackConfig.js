/**
 * Please keep this defaultState updated, to clear all the property of this object
 */
const defaultState = {
  production: false,
  development: false,
  test: false,
  uat: false,

  server: false,
  HTML_TEMPLATE: "",
};

function makeWebpackConfig(wpState = defaultState) {
  let wpConfig;

  if (wpState.server) {
    wpConfig = require("../node/server");
  } else if (wpState.development) {
    wpConfig = require("../client/dev")(wpState);
  } else {
    wpConfig = require("../client/prod")(wpState);
  }

  return wpConfig;
}

module.exports = {
  makeWebpackConfig,
};
