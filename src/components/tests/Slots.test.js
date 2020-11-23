import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// msw
import { server } from "../../mocks/server";
import { rest } from "msw";

import Slots from "../Slots";

describe("<Slots /> Component", () => {
  it('renders "no slots available" if there\'s no slots', async () => {
    server.use(
      rest.get("/slots", (req, res, ctx) => {
        res(ctx.status(200), ctx.json([]));
      })
    );

    const { getByText } = render(<Slots />);

    expect(
      await getByText(/there are no slots available/i)
    ).toBeInTheDocument();
  });
});
