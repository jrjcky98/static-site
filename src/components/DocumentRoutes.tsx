import { Route, Switch } from "react-router-dom";
import routes from "../routes/docs.route";

function DocumentRoutes() {
  return (
    <Switch>
      {routes.map((val, idx) => {
        return <Route key={idx} {...val} />;
      })}
    </Switch>
  );
}

export default DocumentRoutes;
