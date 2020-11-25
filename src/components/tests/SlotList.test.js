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

import { SlotList, Slot } from "../SlotList";

// helpers
import { formatDate } from "../../helpers";

afterEach(cleanup);

describe("<Slot /> component", () => {
  it("should be a button", () => {
    const { getByRole } = render(<Slot time="18:00" quantity={5} />);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("should render the timeslot", () => {
    const { getByText } = render(<Slot time="18:00" quantity={5} />);
    expect(getByText("18:00")).toBeInTheDocument();
  });

  it("should render another timeslot", () => {
    const { getByText } = render(<Slot time="17:00" quantity={5} />);
    expect(getByText("17:00")).toBeInTheDocument();
  });

  it("should be disabled if the quantity is 0", () => {
    const { getByRole } = render(<Slot time="18:00" quantity={0} />);
    expect(getByRole("button")).toBeDisabled();
  });

  it("should not be disabled if the quantity is greater than 0", () => {
    const { getByRole } = render(<Slot time="18:00" quantity={5} />);
    expect(getByRole("button")).toBeEnabled();
  });
});

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
    // date formating
    const today = new Date(),
      tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    // create legible string
    const dateToday = formatDate(today),
      dateTomorrow = formatDate(tomorrow);

    const { getByText, queryByText } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(await queryByText(dateToday)).toBeInTheDocument();
    expect(await queryByText(dateTomorrow)).toBeInTheDocument();
  });

  it("renders a list of buttons with timeslots for each date", async () => {
    // date formating

    const { getByText, queryByText, container } = render(<SlotList />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(await container.querySelectorAll("li button")[0]).toHaveTextContent(
      "18:00"
    );

    expect(await container.querySelectorAll("li button")[1]).toHaveTextContent(
      "19:00"
    );

    expect(await container.querySelectorAll("li button")[2]).toHaveTextContent(
      "20:00"
    );
  });
});
