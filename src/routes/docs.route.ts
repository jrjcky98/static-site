import Hello from "../docs/hello.mdx";

const routes = [
  {
    path: "/post/hello",
    exact: true,
    component: Hello,
  },
];

export default routes;
