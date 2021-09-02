import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const cache = createCache({ key: "custom" });

let renderMethod = ReactDOM.hydrate;

if (module.hot) {
  module.hot.accept();
  renderMethod = ReactDOM.render;
}

loadableReady(() => {
  renderMethod(
    <StrictMode>
      <CacheProvider value={cache}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CacheProvider>
    </StrictMode>,
    document.getElementById("root")
  );
});
