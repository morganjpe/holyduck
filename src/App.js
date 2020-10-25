import React, { useState } from "react";

// components
import Container from "./components/Container";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

function App() {
  const [basket, setBasket] = useState([]);

  const addToBasket = (item, { id, quantity }) => {
    const index = basket.findIndex((item) => item.id === id);

    if (index > -1) {
      setBasket(...(basket[index].quantity += quantity));
      return;
    }
    setBasket(...basket, item);
    return;
  };

  return (
    <>
      <Container>
        <Header />
        <ProductList addToBasket={addToBasket} />
      </Container>
    </>
  );
}

export default App;
