import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
`;

function About() {
  return (
    <AppStyled>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1>This is about page</h1>
      <Link to="/">To Home</Link>
    </AppStyled>
  );
}

export default About;
