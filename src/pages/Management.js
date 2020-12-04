import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import tw, { styled } from "twin.macro";
import { findIndex, debounce } from "lodash";

// auth
import { AuthProvider } from "../components/Authorise";

const AddProductInput = ({ getProducts }) => {
  const [options, setOptions] = useState([]);

  const optionsRef = useRef(false);

  const addOption = () => {
    if (optionsRef.current.value.length) {
      setOptions([...options, optionsRef.current.value]);
      optionsRef.current.value = "";
    }
  };

  const removeOption = (index) => {
    const shallow = [...options];
    shallow.splice(index, 1);
    setOptions(shallow);
  };

  const addProduct = (e) => {
    e.preventDefault();

    const elements = e.target.elements;

    const body = {
      name: elements.name.value,
      desc: elements.desc.value,
      price: elements.price.value,
      stock: elements.stock.value,
      img: elements.img.value,
      allergens: elements.allergens.value,
      options: elements.options.value,
    };

    console.log(body);

    // Array.from(e.target).forEach(({ id, value }) =>
    //   id ? (body[id] = value) : ""
    // );

    // axios
    //   .post("http://localhost:3001/menu_items", body, {
    //     headers: {
    //       token: window.localStorage.getItem("token"),
    //     },
    //   })
    //   .then(({ data }) => {
    //     getProducts();
    //   });
  };

  return (
    <div>
      <h2>Add New product</h2>
      <form onSubmit={addProduct}>
        <input type="hidden" readOnly defaultValue='[""]' id="allergens" />

        <div>
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" required placeholder="Name" />
        </div>

        <div>
          <label htmlFor="desc">Product Name</label>
          <input type="text" id="desc" required placeholder="description" />
        </div>

        <div>
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            step="0.01"
            required
            placeholder="Price"
          />
        </div>

        <div>
          <label htmlFor="stock">Product Price</label>
          <input
            type="number"
            id="stock"
            required
            placeholder="Stock Quantity"
          />
        </div>

        <div>
          <label htmlFor="img">Product Image</label>
          <input type="text" id="img" required placeholder="Image URL" />
        </div>

        <div>
          <label htmlFor="group">Product Group</label>
          <input
            type="text"
            id="group"
            required
            placeholder="Menu group name"
          />
        </div>

        <div>
          <input
            id="options"
            type="hidden"
            value={JSON.stringify(options)}
            readOnly
          />
          <div>
            {options.length
              ? options.map((option, index) => (
                  <div onClick={() => removeOption(index)} key={option}>
                    {option}
                  </div>
                ))
              : "no options"}
          </div>
          <input
            ref={optionsRef}
            type="text"
            id="options-input"
            placeholder="enter an option"
          />
          <div onClick={addOption} role="button">
            Add Option
          </div>
        </div>

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
      updateProducts[index][key] = e.target.value;
      setProducts(updateProducts);

      debounce(() => {
        updateProduct(e, id, key);
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
