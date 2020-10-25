import React from "react";
import propTypes, { string } from "prop-types";
import { styled } from "twin.macro";

const Product = ({ name, desc, stock, img, allergens, price, addToBasket }) => {
  const mainImg = img[0];

  const shortDesc = (description) => {
    return `${description.slice(0, 80)}...`;
  };

  return (
    <>
      <Product.container>
        <Product.price>&pound;{price}</Product.price>
        <Product.image title={name} src={mainImg} />
        <Product.desc>
          <h3>{name}</h3>
          <p>{shortDesc(desc)}</p>
        </Product.desc>
      </Product.container>
    </>
  );
};

Product.container = styled.li`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  position: relative;
`;

Product.image = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

Product.desc = styled.div`
  padding-left: 15px;
  width: calc(100% - 81px);
  h3,
  p {
    width: 100%;
  }
`;

Product.price = styled.span`
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 22px;
`;

Product.propTypes = {
  name: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  stock: propTypes.number.isRequired,
  img: propTypes.arrayOf(string).isRequired,
  allergens: propTypes.arrayOf(string).isRequired,
  addToBasket: propTypes.func.isRequired,
};

export default Product;
