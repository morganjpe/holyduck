import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// mock data
import { products } from "../mocks/api-mock";

// components
import Product from "./Product";

const ProductList = ({ addToBasket }) => {
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
    <div>
      <ProductList.container>
        {prodData.map((product) => {
          return (
            <Product addToBasket={addToBasket} key={product.id} {...product} />
          );
        })}
      </ProductList.container>
    </div>
  );
};

ProductList.container = styled.ul`
  ${tw`w-full md:w-1/2`}
  padding: 0;
  margin: 0;
`;

ProductList.propTypes = {
  addToBasket: propTypes.func.isRequired,
};

export default ProductList;
