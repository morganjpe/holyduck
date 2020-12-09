import React, { useState, useEffect } from "react";
import axios from "axios";
import tw, { styled } from "twin.macro";
import { findIndex, debounce } from "lodash";

// auth
import { AuthProvider } from "../components/Authorise";

// components
import CreateOptions from "../components/management/CreateOption";
import AddProduct from "../components/management/Addproduct";

const Management = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:7000/menu_items").then(({ data }) => {
      setProducts(data);
    });
  };

  const updateProduct = (value, id, key) => {
    axios
      .put(
        `http://localhost:7000/menu_items_update/${id}`,
        {
          [key]: value,
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        if (data.stockUpdated) {
          setMessage("updated");
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
      updateProducts[index][e.target.name] = e.target.value;
      setProducts(updateProducts);

      debounce(() => {
        updateProduct(e.target.value, id, key);
      }, 1000)();
    }
  };

  return (
    <AuthProvider>
      <div style={{ padding: "50px" }}>
        <h1>Stock Manager</h1>
        {message ? message : ""}
        <Management.table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Stock</td>
              <td>Image</td>
              <td>Group</td>
              <td>Options</td>
              <td>Actions</td>
            </tr>
            {products.map(({ id, name, price, stock, img, group, options }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => modifyProductState(e, id, "name")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step=".01"
                      name="price"
                      value={price}
                      onChange={(e) => modifyProductState(e, id, "price")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="stock"
                      value={stock}
                      onChange={(e) => modifyProductState(e, id, "stock")}
                    />
                  </td>
                  <td>
                    <img src={img} alt={name} />
                    <input
                      type="text"
                      value={img}
                      name="img"
                      onChange={(e) => modifyProductState(e, id, "img")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="group"
                      value={group}
                      onChange={(e) => modifyProductState(e, id, '"group"')}
                    />
                  </td>
                  <td>
                    <CreateOptions
                      options={options}
                      controller={(newValue) => {
                        updateProduct(JSON.stringify(newValue), id, "options");
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Management.table>
        <AddProduct getProducts={getProducts} />
      </div>
    </AuthProvider>
  );
};

Management.table = styled.table`
  ${tw`table-auto`}
  background: white;
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
