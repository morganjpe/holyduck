import React from "react";
import tw, { styled } from "twin.macro";
import axios from "axios";

const Slots = ({ confirmSlot }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const mockSlots = {
    Wednesday: {
      "18:00": 0,
      "19:00": 5,
      "20:00": 5,
    },
    Thursday: {
      "18:00": 5,
      "19:00": 5,
      "20:00": 5,
    },
    Friday: {
      "18:00": 5,
      "19:00": 5,
      "20:00": 5,
    },
  };

  const createSlot = (day, time) => {
    confirmSlot({
      day,
      time,
    });
  };

  return (
    <Slots.container>
      {Object.keys(mockSlots).map((key) => {
        return (
          <Slots.date key={key}>
            <h3>{key}</h3>
            {Object.keys(mockSlots[key]).map((timeKey) => {
              return (
                <Slots.time
                  onClick={() => createSlot()}
                  disabled={mockSlots[key][timeKey] === 0 ? true : false}
                  role="button"
                  key={`${key}_${timeKey}`}
                >
                  <h3>{timeKey}</h3>
                </Slots.time>
              );
            })}
          </Slots.date>
        );
      })}
    </Slots.container>
  );
};

Slots.container = styled.div`
  padding: 30px;
`;

Slots.date = styled.div`
  ${tw`flex flex-wrap justify-between`}
  h3 {
    width: 100%;
  }
`;

Slots.time = styled.button`
  ${tw`flex items-center justify-center`}
  width: 150px;
  height: 150px;
  cursor: ${({ disabled }) => (disabled ? "warning" : "pointer")};
  background: ${({ theme }) => theme.colors.hd_red};
  border-radius: 7px;
  border: none;

  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  h3 {
    color: white;
    text-align: center;
  }
`;

export default Slots;
