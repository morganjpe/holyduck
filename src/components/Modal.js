import React, { useState, useRef, useEffect, useCallback } from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";
import { findIndex } from "lodash";

// components
import Toggle from "./Toggle";
import { Button, CloseButton } from "./Button";

// state commands
import { CREATE, UPDATE } from "../state/basket/commands";

const Modal = ({
  name,
  price,
  desc,
  img,
  stock,
  id,
  close,
  setBasket,
  basket,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState(false);
  const modal = useRef(null);

  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  useEffect(() => {
    if (modal) {
      console.log(modal);

      modal.current.addEventListener("keydown", ({ code }) => {
        const focusable = Array.from(
          modal.current.querySelectorAll("button:not([disabled])")
        );

        if (
          code === "Tab" &&
          focusable[focusable.length - 1] === document.activeElement
        ) {
          setTimeout(() => {
            focusable[0].focus();
          });
        }

        if (code === "Escape") close();
      });
    }
  }, []);

  const basketPayload = {
    name,
    price,
    desc,
    stock,
    id,
  };

  const addToBasket = () => {
    const index = findIndex(basket, (item) => item.id === id);
    // if index exists and is within quantity range
    if (index > -1 && basket[index].quantity + quantity <= stock) {
      // already exists
      setBasket({
        type: UPDATE,
        payload: { index, quantity: quantity + basket[index].quantity },
      });
      close();
    } else if (quantity <= stock && index === -1) {
      setBasket({
        type: CREATE,
        payload: { item: { ...basketPayload, quantity } },
      });
      close();
    }
    setErr(true);
  };

  const incQuantity = () => {
    if (quantity + 1 <= stock) {
      setQuantity(quantity + 1);
    }
  };

  const decQuantity = () => {
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const quantityReducer = (action) => {
    switch (action) {
      case "DECREMENT":
        return decQuantity();
      case "INCREMENT":
        return incQuantity();
      default:
        return quantity;
    }
  };

  return (
    <Modal.container>
      <Modal.overlay onClick={close} />
      <Modal.content
        ref={modal}
        id="product-description"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-description_title"
        tabindex="1"
      >
        <CloseButton ref={callbackRef} onClick={close}>
          x <span>Close</span>
        </CloseButton>
        <Modal.image img={img} />
        <Modal.content.inner role="document">
          <h2 id="product-description_title">{name}</h2>
          <p>{desc}</p>
          <Toggle quantity={quantity} quantityReducer={quantityReducer} />
          {err ? "you have exeeded total quantity" : ""}
        </Modal.content.inner>

        <Button onClick={addToBasket}>Add To Basket</Button>
      </Modal.content>
    </Modal.container>
  );
};

Modal.container = styled.div`
  ${tw`flex justify-center flex fixed items-center`}
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
`;

Modal.overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5000000;
  cursor: pointer;
`;

Modal.content = styled.div`
  ${tw`w-full md:w-1/2`}
  background: white;
  z-index: 5000000;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
`;

Modal.image = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #eee;
`;

Modal.content.inner = styled.div`
  padding: 10px 30px 30px 30px;
`;

Modal.close = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  line-height: 22px;
  cursor: pointer;
  color: white;
  background: ${({ theme }) => theme.colors.hd_red};
  border: none;
`;

Modal.propTypes = {
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  stock: propTypes.number.isRequired,
  close: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
};

export default Modal;
