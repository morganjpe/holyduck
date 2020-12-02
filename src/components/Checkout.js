import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import tw, { styled } from "twin.macro";
import { useForm } from "react-hook-form";
import { isValid } from "postcode";
import { useHistory } from "react-router-dom";

// components
import { Button, CloseButton } from "./Button";
import { SlotList } from "./SlotList";

export const CheckoutModal = ({ basket, showModal }) => {
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory(); // used for page navigation

  const [checkoutStep, setCheckoutStep] = useState(1);

  const [orderDetails, setOrderDetails] = useState({
    products: basket,
    address: {},
    slot: {},
  });

  console.log(orderDetails);

  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: basket.map(({ name, price, quantity }) => ({
        description: name,
        amount: {
          currency_code: "GBP",
          value: price * quantity,
        },
      })),
    });
  };

  const onApprove = (data, actions) => {
    const orderID = data.orderID;
    history.push("/confirmation", { ...orderDetails, ref: orderID });
    return actions.order.capture();
  };

  const isValidPostcode = (postcode) => {
    const noWhiteSpacePostCode = postcode.replace(/\s/g, "").toLowerCase();
    if (
      isValid(noWhiteSpacePostCode) &&
      (noWhiteSpacePostCode.includes("ta2") ||
        noWhiteSpacePostCode.includes("ta2"))
    ) {
      return true;
    }
    return "false";
  };

  const confirmAddress = (data) => {
    setOrderDetails({ ...orderDetails, address: data });
    setCheckoutStep(2);
  };

  const confirmSlot = (slot) => {
    // slot {
    //   time,
    //   day,
    //   date
    // }
    setOrderDetails({ ...orderDetails, slot });
    setCheckoutStep(3);
  };

  return (
    <CheckoutModal.container>
      <CheckoutModal.overlay onClick={() => showModal(false)} />
      <div tabIndex="0" />
      <CheckoutModal.group
        id="checkout"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout_title"
      >
        <h3 id="checkout_title" style={{ display: "none" }}>
          Checkout
        </h3>
        <CloseButton onClick={() => showModal(false)}>x</CloseButton>
        {checkoutStep === 1 ? (
          <CheckoutModal.form onSubmit={handleSubmit(confirmAddress)}>
            <CheckoutModal.form.content>
              <h3>Your Address Details</h3>
              <p>We are currently only delivering to TA1, TA2 postcodes</p>

              <input
                ref={register({ required: true })}
                type="text"
                id="addressLine1"
                name="addressLine1"
                placeholder="1st line of address"
              />

              <input
                ref={register({
                  required: true,
                  pattern: /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/i,
                })}
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Mobile Number"
              />
              {errors.phoneNumber && (
                <span>
                  Please enter a valid phone number, We may need to call if we
                  get lost!
                </span>
              )}

              <input
                ref={register({
                  required: true,
                  validate: (value) => isValidPostcode(value),
                })}
                type="text"
                id="postcode"
                name="postcode"
                placeholder="TA..."
              />
              {errors.postcode && <span>Please enter a valid postcode</span>}
            </CheckoutModal.form.content>
            <Button>Book my delivery slot</Button>
          </CheckoutModal.form>
        ) : checkoutStep === 2 ? (
          <SlotList />
        ) : (
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        )}
      </CheckoutModal.group>
      <div tabIndex="0" />
    </CheckoutModal.container>
  );
};

CheckoutModal.container = styled.div`
  ${tw`flex fixed justify-center items-center`}
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

CheckoutModal.overlay = styled.div`
  ${tw`fixed`}
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
`;

CheckoutModal.group = styled.div`
  ${tw`w-full md:w-1/3`}
  position: relative;
  z-index: 50000;
  background-color: white;
  overflow: hidden;
  border-radius: 7px;

  iframe {
    padding: 20px;
  }
`;

CheckoutModal.form = styled.form`
  span {
    color: red;
    font-size: 12px;
    padding: 10px;
  }

  input {
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #eee;
    width: 100%;
    display: block;
  }
`;

CheckoutModal.form.content = styled.div`
  padding: 30px;
`;

export const Checkout = ({ basket }) => {
  const [modal, showModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [modal]);

  const total = () => {
    if (basket && basket.length) {
      return basket
        .map(({ price, quantity }) => price * quantity)
        .reduce((prev, next) => prev + next)
        .toFixed(2);
    }
    return 0;
  };

  return (
    <>
      <Checkout.container>
        <Checkout.grid>
          <li>
            Total: <span>&pound;{total()}</span>
          </li>
          <li>
            Vat: 20%: <span>&pound;{((total() / 100) * 20).toFixed(2)}</span>
          </li>
          <li>
            SubTotal: <span>&pound;{(total() * 1.2).toFixed(2)}</span>
          </li>
        </Checkout.grid>
        <Button
          style={{ borderRadius: "7px" }}
          disabled={!basket.length}
          onClick={() => showModal(true)}
        >
          Checkout Now
        </Button>
        {modal ? <CheckoutModal basket={basket} showModal={showModal} /> : ""}
      </Checkout.container>
    </>
  );
};

Checkout.container = styled.div`
  z-index: 500000;
  position: relative;
`;

Checkout.grid = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;

  li {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;

    span {
      color: grey;
    }
  }
`;

export default Checkout;
