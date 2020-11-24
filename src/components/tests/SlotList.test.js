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

describe("<SlotList /> Component", () => {
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

  it('renders "there has been an error" when server error occurs', async () => {
    server.use(
      rest.get("/slots", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: "there has been an error" })
        );
      })
    );
    const { getByText, queryByText } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(await queryByText(/there has been an error/i)).toBeInTheDocument();
  });

  it("renders a list of dates for slots", async () => {
    const date = formatDate(new Date());

    const { getByText, queryByText } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(await queryByText(date)).toBeInTheDocument();
  });
});
