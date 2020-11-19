import React from "react";
import tw, { styled } from "twin.macro";
import propTypes from "prop-types";

// components
import BasketList from "./BasketList";
import Checkout from "./Checkout";

const Basket = ({ setBasket, basket }) => {
  return (
    <Basket.container>
      <Basket.container.inner>
        <Basket.top>
          <BasketList setBasket={setBasket} basket={basket} />
        </Basket.top>
        <Basket.bottom>
          <Checkout basket={basket} />
        </Basket.bottom>
      </Basket.container.inner>
    </Basket.container>
  );
};

Basket.container = styled.div`
  ${tw`w-full md:w-1/3`}
  padding: 15px;
  z-index: 10000;
`;

Basket.container.inner = styled.div`
  ${tw`shadow-lg`}
  border: 1px solid #eee;
  border-radius: 7px;
  padding: 15px;
  position: sticky;
  top: 20px;
`;

Basket.top = styled.div``;

Basket.bottom = styled.div``;

Basket.propTypes = {
  setBasket: propTypes.func.isRequired,
  basket: propTypes.array.isRequired,
};

export default Basket;
