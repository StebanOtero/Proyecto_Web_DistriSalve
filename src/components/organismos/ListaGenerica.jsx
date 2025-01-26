import styled from "styled-components";
import { BtnCerrar } from "../atomos/BtnCerrar";
import { Device } from "../../styles/breackpoints";
export function ListaGenerica({ data, setState, funcion, scroll, bottom }) {
  const seleccionar = (p) => {
    funcion(p);
    setState();
  };
  return (
    <Container $bottom={bottom} $scroll={scroll}>
      <section className="contentClose">
        <BtnCerrar funcion={setState} />
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => seleccionar(item)}>
              <span>⭐</span>
              <span>{item.descripcion}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: ${(props) => props.$bottom};
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  height: 230px;

  @media ${Device.tablet} {
    width: 400px;
  }
  .contentItems {
    overflow-y: ${(props) => props.$scroll};
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #484848;
      border-radius: 10px;
    }
  }
`;

const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
