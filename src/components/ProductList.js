import React from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// components
import Product from "./Product";

const groupMenuItems = (products, prodGroup) => products.filter(({group}) => group === prodGroup) 

const ProductGroup = ({name, products, showModal}) => {
  return(
    <div>
      <h4>{name}</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, soluta?</p>
      {products.map(product => {
        return <Product showModal={showModal} key={product.id} {...product} />
      })}
    </div>
  )
}

ProductGroup.propTypes = {
  name: propTypes.string.isRequired,
  products: propTypes.array.isRequired,
  showModal: propTypes.func.isRequired,
}


const ProductList = ({products, showModal}) => {

  const burgers = groupMenuItems(products, 'Burgers');
  const wraps = groupMenuItems(products, 'Wraps');

  return (
    <ProductList.container>
      <h2>Order Here</h2>
      <ProductGroup showModal={showModal} name="Burgers" products={burgers}  />
      <ProductGroup showModal={showModal} name="Wraps" products={wraps}  />
    </ProductList.container>
  );
};


ProductList.container = styled.section`
  margin-top: -60px;
  ${tw`w-full md:w-2/3`}
  border: 1px solid #eee;
  min-height: 100vh;
  background-color: white;
  padding: 0px 15px;
  border-radius: 6px;
`;

ProductList.list = styled.ul`
  padding: 0;
  margin: 0;
`;

ProductList.propTypes = {
  showModal: propTypes.func.isRequired,
  products: propTypes.array.isRequired,
};

export default ProductList;
