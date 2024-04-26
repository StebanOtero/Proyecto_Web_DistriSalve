import styled from "styled-components";
import { Header } from "../../index";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export function ApiTemplate() {
  const [products, setProducts] = useState([]);

  const totalProducts = products.length;
  const [productsPerPage, setProductsPerPaget] = useState(6);
  const [currentPage, setcurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const products = await data.json();

    setProducts(products);
  };
  useEffect(() => {
    productList();
  }, []);

  const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />

        <div className="container-products">
          {products
            .map((product) => (
              <div className="card-product" key={product.id}>
                <figure className="container-img">
                  <img src={product.image} alt={product.title} />
                </figure>
                <div className="info-product">
                  <h3>{product.title}</h3>
                  <p>Price: ${product.price}</p>
                  <p>⭐: {product.rating.rate}</p>
                </div>
              </div>
            ))
            .slice(firstIndex, lastIndex)}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
          totalProducts={totalProducts}
        />
      </header>
    </Container>
  );
}
const Container = styled.div`
    min-height: 100vh;
    width:100%;
    background-color: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    padding:20px;

    body{
      font-family: Poppins;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    img{
      max-width: 100%;
    }
        
    .container-products{
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }
    
    .card-product{
      flex: 25%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
    .container-img{
      flex: 1;
    }
    
    .container-img img{
      width: 100%;
      height: 400px;
      object-fit: contain;    
    }
    
    .info-product{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 15px 30px;
      height: 100%;
    }
    
    .info-product h3{
      color: #777;
      font-weight: 500;
    }

    .price{
      color: #000;
      font-weight: 700;
      margin: 15px 0;
    }

    .pagination-link {
      background-color: #F57A1A; 
    }
    
`;
