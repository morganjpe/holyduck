import React, { useState, useReducer } from "react";

// components
import Container from "../components/Container";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Modal from '../components/Modal';
// import BasketList from '../components/BasketList';
// import Checkout from "../components/Checkout";
import Basket from '../components/Basket'

// reducers 
import {basketReducer} from '../state/basket';

function Menu() {

  // basket
  const [basket, setBasket] = useReducer(basketReducer, []);

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

  return (
    <>
      <Header />
      <Container>
        <ProductList showModal={showModal} />

        <Basket setBasket={setBasket} basket={basket}/>

      </Container>

      { activeModal ? (
        <Modal 
          basket={basket}
          setBasket={setBasket}
          close={closeModal} 
          {...modalData} />
      ) : '' }
     
    </>
  );
}

export default Menu;
