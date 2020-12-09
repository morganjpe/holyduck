import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import axios from "axios";

import CreateOption from "./CreateOption";
import { Button } from "../Button";
import { TextInput } from "../Inputs";

const AddProduct = ({ getProducts }) => {
  const [options, setOptions] = useState([]);

  const addProduct = (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    const body = {
      name: elements.name.value,
      desc: elements.desc.value,
      price: elements.price.value,
      stock: elements.stock.value,
      group: elements.group.value,
      img: elements.img.value,
      allergens: elements.allergens.value,
      options: JSON.stringify(options),
    };

    axios
      .post("http://localhost:7000/menu_items", body, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        getProducts();
      });
  };

  return (
    <AddProduct.container>
      <h2>Add New product</h2>
      <form onSubmit={addProduct}>
        <input type="hidden" readOnly defaultValue='[""]' id="allergens" />
        <div>
          <label htmlFor="name">Product Name</label>
          <TextInput type="text" id="name" required placeholder="Name" />
        </div>

        <div>
          <label htmlFor="desc">Product Name</label>
          <TextInput type="text" id="desc" required placeholder="description" />
        </div>

        <div>
          <label htmlFor="price">Product Price</label>
          <TextInput
            type="number"
            id="price"
            step="0.01"
            required
            placeholder="Price"
          />
        </div>

        <div>
          <label htmlFor="stock">Product Price</label>
          <TextInput
            type="number"
            id="stock"
            required
            placeholder="Stock Quantity"
          />
        </div>

        <div>
          <label htmlFor="img">Product Image</label>
          <TextInput type="text" id="img" required placeholder="Image URL" />
        </div>

        <div>
          <label htmlFor="group">Product Group</label>
          <TextInput
            type="text"
            id="group"
            required
            placeholder="Product group"
          />
        </div>

        <CreateOption options={options} controller={setOptions} />

        <Button>Add New</Button>
      </form>
    </AddProduct.container>
  );
};

AddProduct.container = styled.div`
  ${tw`bg-white border rounded border-gray-400 p-5`}

  form {
    ${tw`flex flex-wrap`}

    > div {
      ${tw`w-1/2 px-2 my-3`}

      label {
        ${tw`w-full block mb-2`}
      }
    }
  }
`;

export default AddProduct;
