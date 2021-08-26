import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrate(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
