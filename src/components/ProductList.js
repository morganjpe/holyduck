import React from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// components
import Product from "./Product";

const keys = {
  BURGERS: "Burgers",
  WRAPS: "Wraps",
  SIDES: "Sides",
  SHAKES: "Shakes",
  SAUCES: "Sauces",
  DRINKS: "Drinks",
};

const groupMenuItems = (products, prodGroup) =>
  products.filter(({ group }) => group === prodGroup);

const ProductGroup = ({ name, products, showModal }) => {
  return (
    <div id={`${name.toLowerCase()}_link`}>
      <h4>{name}</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
        soluta?
      </p>
      {products.map((product) => {
        return <Product showModal={showModal} key={product.id} {...product} />;
      })}
    </div>
  );
};

ProductGroup.propTypes = {
  name: propTypes.string.isRequired,
  products: propTypes.array.isRequired,
  showModal: propTypes.func.isRequired,
};

const ProductNav = () => {
  console.log(Object.keys(keys));

  return (
    <ProductNav.nav>
      <ProductNav.ul>
        {Object.keys(keys).map((key) => {
          // return key;
          return (
            <ProductNav.item key={`${keys[key].toLowerCase()}-key`}>
              <a href={`#${keys[key].toLowerCase()}_link`}>{keys[key]}</a>
            </ProductNav.item>
          );
        })}
      </ProductNav.ul>
    </ProductNav.nav>
  );
};

ProductNav.nav = styled.nav`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
`;

ProductNav.ul = styled.ul`
  ${tw`flex`}
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
`;

ProductNav.item = styled.li`
  padding: 20px 40px 20px 0;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.hd_red};
    :hover {
      opacity: 0.7;
    }
  }
`;

const ProductList = ({ products, showModal }) => {
  const burgers = groupMenuItems(products, keys.BURGERS);
  const wraps = groupMenuItems(products, keys.WRAPS);

  return (
    <ProductList.container>
      <h2>Order Here</h2>
      <ProductNav />
      <ProductGroup showModal={showModal} name="Burgers" products={burgers} />
      <ProductGroup showModal={showModal} name="Wraps" products={wraps} />
    </ProductList.container>
  );
};

ProductList.container = styled.section`
  margin-top: -60px;
  ${tw`w-full md:w-2/3`}
  border: 1px solid #eee;
  height: calc(100vh - ((181px - 60px) + 80px));
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
