import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

// wrapper
import { ThemeProvider } from "emotion-theming";
import { theme } from "../../theme";

// checkout
import { Checkout } from "../Checkout";

const basket = [
  {
    desc:
      "Confit Shredded Duck with Sage, Onion, Chestnut and Sausage Meat Stuffing with Cranberry Sauce, Mayonnaise and Rocket.",
    id: 1,
    name: "Duck McStuffin’",
    price: "8.50",
    quantity: 1,
    stock: 2000,
  },
  {
    desc:
      "Confit Shredded Duck with Sage, Onion, Chestnut and Sausage Meat Stuffing with Cranberry Sauce, Mayonnaise and Rocket.",
    id: 1,
    name: "Duck McStuffin’",
    price: "8.50",
    quantity: 1,
    stock: 2000,
  },
];

describe("<Checkout /> component", () => {
  it("should display a disabled checkout button if basket is empty", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Checkout basket={[]} />
      </ThemeProvider>
    );
    expect(getByText(/checkout now/i)).toBeDisabled();
  });

  it("should display an enabled checkout button if products are in basket", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Checkout basket={basket} />
      </ThemeProvider>
    );
    expect(getByText(/checkout now/i)).toBeEnabled();
  });
  it("should display the total, 20% service charge and subtotal", () => {
    const value = (8.5 * 2).toFixed(2);
    const service = ((value / 100) * 20).toFixed(2);
    const total = (parseFloat(value) + parseFloat(service)).toFixed(2);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Checkout basket={basket} />
      </ThemeProvider>
    );
    expect(getByText(`£${value}`)).toBeInTheDocument();
    expect(getByText(`£${service}`)).toBeInTheDocument();
    expect(getByText(`£${total}`)).toBeInTheDocument();
  });
});
