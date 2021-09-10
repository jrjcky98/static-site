import loadable from "@loadable/component";
import Home from "./pages/Home";

const About = loadable<JSX.Element>(() => import("./pages/About"));

const AboutMe = loadable<JSX.Element>(() => import("./pages/AboutMe"));

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
  {
    path: "/about/me",
    exact: true,
    component: AboutMe,
  },
];

export default routes;
