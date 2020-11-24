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

import Slots from "../Slots";

// helpers
import { formatDate } from "../../helpers";

afterEach(cleanup);

describe("<Slots /> Component", () => {
  it("renders loading on initial load", () => {
    const { getByText } = render(<Slots />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  //   it.skip("renders a list of slots", async () => {
  //     // const datestring = await formatDate(new Date());
  //     // const { getByText } = render(<Slots />);
  //     // expect(getByText(/there are no slots available/i)).toBeInTheDocument();
  //     // // await waitForElementToBeRemoved(() =>
  //     // //   screen.getByText(/there are no slots available/i)
  //     // // );
  //     // await waitForElement(() => screen.getByText(datestring));
  //     // expect(await findByText("18:00")).toBeInTheDocument();
  //     // expect(await findByText("18:00")).toBeInTheDocument();
  //     // expect(await findByText("19:00")).toBeInTheDocument();
  //   });
});

describe("<Slots /> Component", () => {
  it('renders "no slots available" if there\'s no slots', async () => {
    server.use(
      rest.get("/slots", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    const { getByText, queryByText } = render(<Slots />);

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    expect(
      await queryByText(/there are no slots available/i)
    ).toBeInTheDocument();
  });
});
