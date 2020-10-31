import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// mock data
import { products } from "../mocks/api-mock";

// components
import Product from "./Product";

const ProductList = ({showModal}) => {
  const [prodData, setProdData] = useState([]);

  useEffect(() => {
    if (products.length) {
      // mimic api lag
      setTimeout(() => {
        setProdData(products);
      }, 1500);
    }
  }, [prodData]);

  return (
      <ProductList.container>
        {prodData.map((product) => {
          return (
            <Product showModal={showModal} key={product.id} {...product} />
          );
        })}
      </ProductList.container>
  );
};

ProductList.container = styled.ul`
  ${tw`w-full md:w-1/2`}
  padding: 0;
  margin: 0;
  height: calc(100vh - 60px);
  border-right: 1px solid #eee;
  overflow: scroll;
`;



ProductList.propTypes = {
  showModal: propTypes.func.isRequired,
};

export default ProductList;
