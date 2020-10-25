import React, { useState } from "react";

// components
import Container from "./components/Container";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Modal from './components/Modal';
import BasketList from './components/BasketList';

function App() {

  // basket
  const [basket, setBasket] = useState([]);

  // modal 
  const [activeModal, setActiveModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = function (data) {
    setActiveModal(true); // display modal
    setModalData(data);
  }

  const closeModal = function () {
    setActiveModal(false); // display modal
    setModalData({});
  }

  const addToBasket = (basketItem, quantity) => {
    const index = basket.findIndex((item) => item.id === basketItem.id);

    if (index > - 1) {
      const shallow = [...basket];
      shallow[index].quantity += quantity;
      setBasket(shallow);
      closeModal();
      return;
    }
    
    setBasket([...basket, {...basketItem, quantity}]);
    closeModal();
    return;
  };

  return (
    <>
      <Container>
        <Header />
        <ProductList showModal={showModal} />
        <BasketList basketItems={basket} />
      </Container>

      { activeModal ? (
        <Modal 
          addToBasket={addToBasket}
          close={closeModal} 
          {...modalData} />
      ) : '' }
     
    </>
  );
}

export default App;
