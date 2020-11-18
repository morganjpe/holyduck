import React, { useState, useReducer } from "react";
import axios from "axios";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

// components
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import Basket from "../components/Basket";

// reducers
import { basketReducer } from "../state/basket";

// query cache
const cache = new QueryCache();

function Menu() {
  // basket
  const [basket, setBasket] = useReducer(basketReducer, []);

  // modal
  const [activeModal, setActiveModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = function (data) {
    setActiveModal(true); // display modal
    setModalData(data);
    // bomb()
  };

  const closeModal = function () {
    setActiveModal(false); // display modal
    setModalData({});
  };

  // react query data fetching
  const { isLoading, error, data } = useQuery("products", () =>
    axios.get("http://localhost:3001/menu_items").then(({ data }) => data)
  );

  return (
    <>
      <Header />
      <ReactQueryCacheProvider queryCache={cache}>
        {isLoading ? (
          "loading ..."
        ) : error ? (
          "there has been an error"
        ) : (
          <Container>
            <ProductList products={data} showModal={showModal} />
            <Basket setBasket={setBasket} basket={basket} />
          </Container>
        )}

        {activeModal ? (
          <Modal
            basket={basket}
            setBasket={setBasket}
            close={closeModal}
            {...modalData}
          />
        ) : (
          ""
        )}
      </ReactQueryCacheProvider>
      <Footer />
    </>
  );
}

export default Menu;
