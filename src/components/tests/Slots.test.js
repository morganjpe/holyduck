import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

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
      await findByText(/there are no slots available/i)
    ).toBeInTheDocument();
  });

  it("renders a list of slots", async () => {
    const datestring = formatDate(new Date());
    console.log(datestring);

    const { findByText } = render(<Slots />);

    expect(await findByText(datestring)).toBeInTheDocument();
    expect(await findByText("18:00")).toBeInTheDocument();
    expect(await findByText("19:00")).toBeInTheDocument();
  });
});
