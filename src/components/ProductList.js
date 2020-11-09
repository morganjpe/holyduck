import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import tw, { styled } from "twin.macro";

// mock data
// import { group } from "../mocks/api-mock";

// components
import Product from "./Product";


// const ProductListGroup = ({prodData, groupKey, showModal}) => {

//   const [groupData, setGroupData] = useState({});

//   useEffect(() => {

//     if(!Object.keys(groupData)) {
//       setTimeout(() => {
//         setGroupData(group['groupKey']);
//       }, 500) // mock timeout
//     }

//   }, [groupData]);

//   if(!Object.keys(groupData)) {

//   }

//   return(
//     <div>
//       loading ... 
//     </div>
//   )


// }


const ProductList = ({products, showModal}) => {

  return (
    <ProductList.container>
      <h3>Order Here</h3>
      <ProductList.list>
        {products.map((product) => {
          return (
            <Product showModal={showModal} key={product.id} {...product} />
          );
        })}
      </ProductList.list>
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
};

export default ProductList;
