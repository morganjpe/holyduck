import React from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// components
import Toggle from "./Toggle";

// state
import { UPDATE, DELETE } from "../state/basket/commands";

const BasketItem = ({
  name,
  quantity,
  price,
  stock,
  index,
  setBasket,
  basket,
}) => {
  const incQuantity = () => {
    if (quantity + 1 <= stock) {
      setBasket({ type: UPDATE, payload: { index, quantity: quantity + 1 } });
    }
  };

  const decQuantity = () => {
    if (quantity - 1 > 0) {
      setBasket({ type: UPDATE, payload: { index, quantity: quantity - 1 } });
    } else {
      setBasket({ type: DELETE, payload: { index } });
    }
  };

  const quantityReducer = (action) => {
    switch (action) {
      case "INCREMENT":
        return incQuantity();
      case "DECREMENT":
        return decQuantity();
      default:
        return basket;
    }
  };

  return (
    <BasketItem.container>
      <BasketItem.group>
        <Toggle quantity={quantity} quantityReducer={quantityReducer} />
        <p>{name}</p>
      </BasketItem.group>

      <BasketItem.details>
        <span>£{(price * quantity).toFixed(2)}</span>
      </BasketItem.details>
    </BasketItem.container>
  );
};

BasketItem.container = styled.li`
  ${tw`flex items-center justify-between`}
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

BasketItem.group = styled.div`
  ${tw`flex items-center`}
  width: 50%;

  div {
    width: 30%;
    margin-right: 10px;
  }
`;

BasketItem.details = styled.div`
  ${tw`flex justify-between`}
  padding-left: 10px;
`;

BasketItem.propTypes = {
  name: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  price: propTypes.string.isRequired,
  stock: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  setBasket: propTypes.func.isRequired,
  basket: propTypes.array.isRequired,
};

const BasketList = ({ basket, setBasket }) => {
  return (
    <BasketList.list>
      {basket.length ? (
        basket.map((item, index) => {
          return (
            <BasketItem
              key={item.id}
              setBasket={setBasket}
              index={index}
              basket={basket}
              {...item}
            />
          );
        })
      ) : (
        <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
          Your basket is empty
        </li>
      )}
    </BasketList.list>
  );
};

BasketList.list = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default BasketList;
