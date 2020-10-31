import React, { useState } from "react";

// components
import Container from "../components/Container";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Modal from '../components/Modal';
import BasketList from '../components/BasketList';
import Checkout from "../components/Checkout";

function Menu() {

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

    const basketCopy = [...basket];

    // find existing index
    const index = basket.findIndex((item) => item.id === basketItem.id);

    if (index === -1 && quantity <= basketItem.stock) {
      setBasket([...basket, {...basketItem, quantity}]);
      closeModal();
      return false;
    }

    if (index > - 1 && quantity + basket[index]?.quantity <= basketItem.stock) {
      basketCopy[index].quantity += quantity;
      setBasket(basketCopy);
      closeModal();
      return false;
    }
    
    return true;

  };

  return (
    <>
      <Header />
      <Container>
        <ProductList showModal={showModal} />
        <BasketList basketItems={basket} />
        <Checkout />
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

export default Menu;
