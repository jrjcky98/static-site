import { MDXProvider } from "@mdx-js/react";
import { Route, Switch } from "react-router-dom";
import Notes from "../components/Notes";
import Hello from "../docs/hello.mdx";

function Post() {
  return (
    <MDXProvider components={{ Notes }}>
      <h3>This is a post</h3>
      <Switch>
        <Route path="/post/hello" component={Hello} />
      </Switch>
    </MDXProvider>
  );
}

export default Post;
