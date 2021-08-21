import React from "react";
import classes from "./App.module.css";

function App(): JSX.Element {
  return (
    <div className={classes.App}>
      <h1>Welcome to Epic!</h1>
      <p>env: {process.env.SHOPEE_ENV}</p>
    </div>
  );
}

export default App;
