import React, { useState, useReducer } from "react";

// components
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import Basket from "../components/Basket";

// reducers
import { basketReducer } from "../state/basket";

function Menu() {
  // basket
  const [basket, setBasket] = useReducer(basketReducer, []);

  // modal
  const [modal, setModal] = useState({
    content: {},
    open: false,
  });

  const showModal = function (data) {
    document.body.style.overflow = "hidden";
    setModal({
      open: true,
      content: data,
    });
  };

  const closeModal = function () {
    document.body.style.overflow = "initial";
    setModal({
      open: false,
      content: {},
    });
  };

  return (
    <>
      <Header />
      <Container>
        <ProductList showModal={showModal} />
        <Basket setBasket={setBasket} basket={basket} />
      </Container>
      {modal.open ? (
        <Modal
          basket={basket}
          setBasket={setBasket}
          close={closeModal}
          {...modal.content}
        />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default Menu;
