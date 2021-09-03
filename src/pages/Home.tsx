import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const AppStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
`;

function Home() {
  return (
    <AppStyled>
      <h1>A Warm Welcome to Epic!</h1>
      <p>env:{process.env.BASE_ENV}</p>
      <Link to="/about">To About</Link>
    </AppStyled>
  );
}

export default Home;
