const fs = require("fs");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const App = require("../src/App").default;

function buildTemplate() {
  const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
  const reactDOMString = buildReactDOM();
  const replacedTemplate = htmlFile.replace("%HTML_BODY%", reactDOMString);
  return replacedTemplate;
}

function buildReactDOM() {
  const result = ReactDOMServer.renderToStaticMarkup(<App />);
  return result;
}

module.exports = {
  buildTemplate,
};
