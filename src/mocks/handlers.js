import { rest } from "msw";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const slots = [
  {
    date: today,
    slots: {
      "18:00": 5,
      "19:00": 5,
      "20:00": 0,
    },
  },
  {
    date: tomorrow,
    slots: {
      "18:00": 6,
      "19:00": 3,
      "20:00": 0,
    },
  },
];

export const handlers = [
  rest.get("/slots", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(slots));
  }),
];
