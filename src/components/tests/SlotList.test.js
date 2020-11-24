import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

// msw
import { server } from "../../mocks/server";
import { rest } from "msw";

import { SlotList } from "../SlotList";

// helpers
import { formatDate } from "../../helpers";

afterEach(cleanup);

describe("<Slots /> Component", () => {
  it("renders loading on initial load", () => {
    const { getByText } = render(<SlotList />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders "no slots available" if there\'s no slots', async () => {
    server.use(
      rest.get("/slots", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    const { getByText, queryByText } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(
      await queryByText(/there are no slots available/i)
    ).toBeInTheDocument();
  });

  it("renders a list of slots", async () => {
    const datestring = await formatDate(new Date());
    const { getByText, queryByText } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(await queryByText(datestring)).toBeInTheDocument();
    expect(await queryByText("18:00")).toBeInTheDocument();
    expect(await queryByText("18:00")).toBeInTheDocument();
    expect(await queryByText("19:00")).toBeInTheDocument();
  });
});
