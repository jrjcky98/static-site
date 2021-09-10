import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Hello from "../docs/hello";

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
      <h1>This is about page</h1>
      <Link to="/">To Home</Link>
      <Hello />
    </AppStyled>
  );
}

export default About;
