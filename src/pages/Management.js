import React, { useState, useEffect } from "react";
import axios from "axios";
import tw, { styled } from "twin.macro";
import { findIndex, debounce } from "lodash";

const AddProductInput = ({ getProducts }) => {
  const addProduct = (e) => {
    e.preventDefault();

    const body = {};

    Array.from(e.target).forEach(({ id, value }) =>
      id ? (body[id] = value) : ""
    );
    console.log(window.localStorage.getItem("token"));

    axios
      .post(
        "https://holy-duck-server-42v9n.ondigitalocean.app/menu_items",
        body,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        getProducts();
      });
  };

  return (
    <div>
      <h2>Add New product</h2>
      <form onSubmit={addProduct}>
        <input type="text" hidden defaultValue='[""]' id="allergens" />
        <input type="text" id="name" required placeholder="Name" />
        <input
          type="text"
          id="`desc`"
          required
          placeholder="product description"
        />
        <input
          type="number"
          id="price"
          step="0.01"
          required
          placeholder="Price"
        />
        <input type="number" id="stock" required placeholder="Stock Quantity" />
        <input type="text" id="img" required placeholder="Image URL" />
        <input type="text" id="group" required placeholder="Menu group name" />
        <button>Add New</button>
      </form>
    </div>
  );
};

const Management = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  });

  const getProducts = () => {
    axios
      .get("https://holy-duck-server-42v9n.ondigitalocean.app/menu_items")
      .then(({ data }) => {
        setProducts(data);
      });
  };

  const updateProduct = (e, id, key) => {
    axios
      .put(
        `https://holy-duck-server-42v9n.ondigitalocean.app/update_stock${id}`,
        {
          [key]: e.target.value,
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        if (data.stockUpdated) {
          setMessage("stock updated");
          setTimeout(() => setMessage(false), 2000);
        }
      })
      .catch((err) => {
        setMessage("there has been an error");
        setTimeout(() => setMessage(false), 2000);
      });
  };

  const deleteProduct = (itemId) => {
    const conf = window.confirm(
      "are you sure you want to delete this product?"
    );
    if (conf === true) {
      axios
        .delete(
          `https://holy-duck-server-42v9n.ondigitalocean.app/menu_items${itemId}`,
          {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          }
        )
        .then(({ data }) => {
          if (parseInt(data.deleted) === parseInt(itemId)) {
            getProducts();
          }
        })
        .catch((err) => {
          setMessage("there has been an error");
          setTimeout(() => setMessage(false), 2000);
        });
    }
  };

  const modifyProductState = (e, id, key) => {
    const updateProducts = [...products];
    const index = findIndex(updateProducts, (item) => item.id === id);

    if (index > -1) {
      updateProducts[index][key] = e.target.value;
      setProducts(updateProducts);

      debounce(() => {
        updateProduct(e, id, key);
      }, 1000)();
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Stock Manager</h1>
      {message ? message : ""}
      <Management.table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Image</td>
            <td>Group</td>
            <td>Actions</td>
          </tr>
          {products.map(({ id, name, price, stock, img, group }) => {
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                  <input
                    onChange={(e) => modifyProductState(e, id, "stock")}
                    type="text"
                    value={stock}
                  />
                </td>
                <td>
                  <img src={img} alt={name} />
                </td>
                <td>{group}</td>
                <td>
                  <button onClick={() => deleteProduct(id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Management.table>
      <AddProductInput getProducts={getProducts} />
    </div>
  );
};

Management.table = styled.table`
  ${tw`table-auto`}
  margin-bottom: 50px;
  td {
    border: 0 solid #eee;
    ${tw`border px-4 py-2`}

    img {
      width: 120px;
    }
  }
`;

export default Management;

// CREATE EXTENSION pgcrypto;

// Insert into users (email, password) values (
//     'hello@holy-duck.co.uk',
//      crypt('weloveduck', gen_salt('bf'))
//  )
