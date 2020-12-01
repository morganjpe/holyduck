import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "../../theme";

import Product from "../Product";
import ProductList from "../ProductList";

const productData = {
  name: "Duck McStuffin'",
  desc: "this is the description",
  stock: 5,
  price: "8.50",
  img:
    "//www.screwfix.com/images/CAT143/assets/gfx/black_friday_4_day_hero_two_lg.png",
  allergens: [],
  showModal: () => {},
};

describe("<Product /> component", () => {
  it("should display the product details", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Product {...productData} />
      </ThemeProvider>
    );

    expect(getByText("Duck McStuffin'")).toBeInTheDocument();
    expect(getByText("this is the description...")).toBeInTheDocument();
    expect(getByText("£8.50")).toBeInTheDocument();
  });

  it("should be disabled if there's no product stock", () => {
    productData.stock = 0;

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Product {...productData} />
      </ThemeProvider>
    );

    expect(getByRole("button")).toBeDisabled();
  });

  it("should be enabled if there's no product stock", () => {
    productData.stock = 10;
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Product {...productData} />
      </ThemeProvider>
    );
    expect(getByRole("button")).toBeEnabled();
  });
});
