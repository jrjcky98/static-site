/**
 * Please keep this defaultState updated, to clear all the property of this object
 */
const defaultState = {
  production: false,
  development: false,
  test: false,
  uat: false,

  HTML_TEMPLATE: "",
};

function makeWebpackConfig(wpState = defaultState) {
  let wpConfig;
  if (wpState.development) {
    wpConfig = require("../dev")(wpState);
  } else {
    wpConfig = require("../prod")(wpState);
  }

  return wpConfig;
}

module.exports = {
  makeWebpackConfig,
};
