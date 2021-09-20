import { MDXProvider } from "@mdx-js/react";
import DocumentRoutes from "../components/DocumentRoutes";
import Notes from "../components/Notes";

function Post() {
  return (
    <MDXProvider components={{ Notes }}>
      <h3>This is a post</h3>
      <DocumentRoutes />
    </MDXProvider>
  );
}

export default Post;
