const fs = require("fs");
const { default: routes } = require("../src/routes");

const baseBuildPath = "build";

function getRoutes() {
  return routes.map((val) => val.path);
}

function buildRoutes() {
  const routePath = getRoutes();

  routePath.forEach((val) => {
    const totalPath = baseBuildPath + val;
    if (!fs.existsSync(totalPath)) {
      fs.mkdirSync(totalPath, { recursive: true });
    }
  });

  return { routePath };
}

module.exports = {
  buildRoutes,
  baseBuildPath,
};
