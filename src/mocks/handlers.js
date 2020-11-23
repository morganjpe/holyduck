import { rest } from "msw";

const slots = [
  {
    date: new Date(),
    slots: {
      "18:00": 5,
      "19:00": 5,
      "20:00": 0,
    },
  },
];

export const handlers = [
  rest.get("/slots", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(slots));
  }),
];
