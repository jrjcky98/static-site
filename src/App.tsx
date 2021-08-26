import React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
`;

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
      <AppStyled>
        <h1>Welcome to Epic!</h1>
        <p>env: {process.env.SHOPEE_ENV}</p>
      </AppStyled>
    </>
  );
}

export default App;
