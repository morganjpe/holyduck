import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

// msw
import { server } from "../../mocks/server";
import { rest } from "msw";

import Slots from "../Slots";

// helpers
import { formatDate } from "../../helpers";

describe("<Slots /> Component", () => {
  it('renders "no slots available" if there\'s no slots', async () => {
    server.use(
      rest.get("/slots", (req, res, ctx) => {
        res(ctx.status(200), ctx.json([]));
      })
    );

    const { findByText } = render(<Slots />);

    expect(
      await screen.findByText(/there are no slots available/i)
    ).toBeInTheDocument();
  });

  it.skip("renders a list of slots", async () => {
    const datestring = await formatDate(new Date());
    render(<Slots />);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/there are no slots available/i)
    );
    console.log("change");
    await waitFor(() => screen.getByText(datestring));

    // expect(await findByText("18:00")).toBeInTheDocument();
    // expect(await findByText("19:00")).toBeInTheDocument();
  });
});
