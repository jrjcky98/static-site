import fs from "fs";
import appRoutes from "../../src/routes/app.route";
import docsRoutes from "../../src/routes/docs.route";

const baseBuildPath = "build";

function getRoutes() {
  return appRoutes
    .map((val) => val.path)
    .concat(docsRoutes.map((val) => val.path));
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
