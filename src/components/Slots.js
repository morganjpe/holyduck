import React, { useState, useEffect } from "react";
import axios from "axios";

const Slots = () => {
  const [slots, setSlots] = useState({
    status: "pending",
    error: null,
    data: [],
  });

  useEffect(() => {
    if (!slots.data.length) {
      axios
        .get("https://holy-duck-server-42v9n.ondigitalocean.app/slots")
        .then(({ data }) => {
          console.log(data);
          setSlots({ ...slots, status: "success", data });
        })
        .catch((error) =>
          setSlots({ ...slots, status: "error", error: error })
        );
    }
  }, []);

  return slots.data.length ? <div></div> : "there are no slots available";
};

export default Slots;

// import tw, { styled } from "twin.macro";
// import { findIndex } from "lodash";
// import axios from "axios";

// const Slot = ({ day, time, quantity }) => {
//   // each card should have a date associated with it
//   // if day of the week is past

//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   const currentDate = new Date();

//   return (
//     <Slot.container disabled={!quantity}>
//       <h3>{time}</h3>
//     </Slot.container>
//   );
// };

// Slot.container = styled.button`
//   ${tw`flex items-center justify-center`}
//   width: 150px;
//   height: 150px;
//   cursor: ${({ disabled }) => (disabled ? "warning" : "pointer")};
//   background: ${({ theme }) => theme.colors.hd_red};
//   border-radius: 7px;
//   border: none;

//   opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

//   h3 {
//     color: white;
//     text-align: center;
//   }
// `;

// const Slots = ({ confirmSlot }) => {
//   const mockSlots = {
//     Wednesday: {
//       "18:00": 0,
//       "19:00": 5,
//       "20:00": 5,
//     },
//     Thursday: {
//       "18:00": 5,
//       "19:00": 5,
//       "20:00": 5,
//     },
//     Friday: {
//       "18:00": 5,
//       "19:00": 5,
//       "20:00": 5,
//     },
//   };

//   return (
//     <Slots.container>
//       {Object.keys(mockSlots).map((key) => {
//         return (
//           <Slots.date key={key}>
//             <h3>{key}</h3>
//             {Object.keys(mockSlots[key]).map((timeKey) => {
//               return (
//                 <Slot
//                   day={key}
//                   time={timeKey}
//                   quantity={mockSlots[key][timeKey]}
//                 />
//               );
//             })}
//           </Slots.date>
//         );
//       })}
//     </Slots.container>
//   );
// };

// Slots.container = styled.div`
//   padding: 30px;
// `;

// Slots.date = styled.div`
//   ${tw`flex flex-wrap justify-between`}
//   h3 {
//     width: 100%;
//   }
// `;

// export default Slots;
