import { Route } from "react-router-dom";
import routes from "../routes";

function Routes() {
  return (
    <>
      {routes.map((val, idx) => {
        return <Route key={idx} {...val} />;
      })}
    </>
  );
}

export default Routes;
