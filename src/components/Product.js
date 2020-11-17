import React from "react";
import propTypes from "prop-types";
import { styled } from "twin.macro";

const Product = ({ 
  id,
  name, 
  desc, 
  stock, 
  img, 
  allergens, 
  price, 
  showModal 
}) => {
  
  const shortDesc = (description) => {
    return `${description.slice(0, 70)}...`;
  };

  const modalPayload = {
    name, 
    price, 
    desc, 
    img,
    stock,
    id,
  }

  return (
    <>
      <Product.container stock={stock} onClick={stock ? () => showModal(modalPayload) : null}>
        <Product.image title={name} src={img} />
        <Product.desc>
          <span><h3>{name}</h3><p>&pound;{price.toFixed(2)}</p></span>
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
  padding: 20px 15px 20px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  cursor: ${({stock}) => stock ? 'pointer' : 'not-allowed'};
  opacity: ${({stock}) => stock ? 1 : .5};
`;

Product.image = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background-color: #eee;
`;

Product.desc = styled.div`
  padding-left: 15px;
  width: calc(100% - 81px);

  span {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    h3 {
      margin: 0;
      font-size: 16px;
    }
   
    p {
      display: inline;
      text-align: right;
      margin: 0;
      padding: 5px 10px;
      background-color: ${({theme}) => theme.colors.hd_red};
      border-radius: 5px;
      color: white;
    }
  }

  p {
    font-size: 14px;
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
  img: propTypes.string.isRequired,
  allergens: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
};

export default Product;
