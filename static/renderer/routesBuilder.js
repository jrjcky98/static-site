import fs from "fs";
import routes from "../../src/routes";

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

export { buildRoutes, baseBuildPath };
