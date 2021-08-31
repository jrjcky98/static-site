import loadable from "@loadable/component";
import Loading from "./components/Loading";
import Home from "./pages/Home";

const About = loadable<JSX.Element>(() => import("./pages/About"), {
  fallback: Loading(),
});

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    component: About,
  },
];

export default routes;
