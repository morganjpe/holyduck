import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios'

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

  // products 
  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!products.length) {

      console.log(products);

      axios.get('http://localhost:3001/menu_items')
        .then(({data}) => setProducts(data)); 

    }
  }, [products]);


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
        <ProductList products={products} showModal={showModal} />

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
