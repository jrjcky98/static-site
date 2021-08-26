import { Global, css } from "@emotion/react";
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";
import About from "./pages/About";

function App(): JSX.Element {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: "Roboto";
          }
        `}
      />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
