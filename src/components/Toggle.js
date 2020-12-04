import React from "react";
import tw, { styled, theme } from "twin.macro";
import propTypes from "prop-types";

const Toggle = ({ quantity, quantityReducer, preventZero }) => {
  return (
    <Toggle.container>
      <Toggle.button
        disabled={!preventZero ? true : quantity === 1 ? true : false}
        onClick={() => quantityReducer("DECREMENT")}
      >
        &minus;
        <span>
          {quantity > 1
            ? `reduce quantity to ${quantity - 1}`
            : `quantity is set to 1`}
        </span>
      </Toggle.button>
      <Toggle.value aria-live="polite">
        {quantity}
        <span>currently selected to add to basket </span>
      </Toggle.value>
      <Toggle.button onClick={() => quantityReducer("INCREMENT")}>
        &#43;
        <span>Add one more to basket</span>
      </Toggle.button>
    </Toggle.container>
  );
};

Toggle.container = styled.div`
  ${tw`flex justify-between`}
`;

Toggle.button = styled.button`
  ${tw`flex items-center justify-center`}
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${theme`colors.hdred`};
  background-color: white;
  color: ${theme`colors.hdred`};
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

Toggle.value = styled.div`
  span {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

Toggle.propTypes = {
  quantity: propTypes.number.isRequired,
  quantityReducer: propTypes.func.isRequired,
};

export default Toggle;
