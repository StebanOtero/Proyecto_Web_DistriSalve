import styled from "styled-components";
export const Colorcontent = styled.div`
  display: flex;
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  background-color: ${(props) => props.$color};
  border-radius: 50%;
  text-align: center;
`;
