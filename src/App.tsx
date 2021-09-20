import { Global, css } from "@emotion/react";
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

      <Routes />
    </>
  );
}

export default App;
