import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import tw, { styled } from "twin.macro";

import "react-calendar/dist/Calendar.css";

const Appointments = () => {
  const [value, onChange] = useState(new Date());

  const dateChange = (e) => {
    console.log(e);
    onChange(e);
  };

  return (
    <Appointments.container>
      <Calendar onChange={dateChange} value={value} />
    </Appointments.container>
  );
};

Appointments.container = styled.section`
  ${tw`container mx-auto`}
`;

export default Appointments;
