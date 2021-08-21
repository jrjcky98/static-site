const path = require("path");

function getPathConfig(strPath) {
  return path.resolve(__dirname, "..", strPath);
}

module.exports = {
  getPathConfig,
};
