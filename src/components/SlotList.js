import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import propTypes from "prop-types";

// helpers
import { formatDate } from "../helpers";

export const Slot = ({ time, quantity }) => {
  return <button disabled={quantity ? false : true}>{time}</button>;
};

Slot.propTypes = {
  time: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
};

export const SlotList = () => {
  const _isMounted = useRef(true);

  const [slots, setSlots] = useState({
    status: "pending",
    error: null,
    data: [],
  });

  useEffect(() => {
    if (!slots.data.length) {
      axios
        .get("/slots")
        .then(({ data }) => {
          if (_isMounted.current) {
            setSlots({ ...slots, status: "success", data });
          }
        })
        .catch((error) => {
          if (_isMounted.current) {
            setSlots({ ...slots, status: "error", error: error });
          }
        });
    }

    return () => {
      _isMounted.current = false;
    };
  }, [slots]);

  return (
    <>
      {slots.status === "pending" ? (
        "Loading..."
      ) : slots.status === "success" ? (
        slots.data.length ? (
          <ul>
            {slots.data.map((group) => {
              return (
                <li data-testid="slot-group" key={group.date}>
                  <h5>{formatDate(new Date(group.date))}</h5>
                  <ul>
                    {Object.keys(group.slots).map((slotKey) => {
                      return (
                        <li key={`${group.date}_${slotKey}`}>
                          <Slot
                            time={slotKey}
                            quantity={group.slots[slotKey]}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : (
          "There are no slots available"
        )
      ) : (
        "there has been an error"
      )}
    </>
  );
};
