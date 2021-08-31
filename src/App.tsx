import { Global, css } from "@emotion/react";
import { Switch } from "react-router-dom";
import Routes from "./components/Routes";

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
        <Routes />
      </Switch>
    </>
  );
}

export default App;
