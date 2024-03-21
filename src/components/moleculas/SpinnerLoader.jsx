import styled from "styled-components";
import { PacmanLoader } from "react-spinners";
export function SpinnerLoader() {
  return (
    <Container>
      <PacmanLoader color="#FFF140" size={100} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.bgtotal};
  transform: all 0.3s;
`;
