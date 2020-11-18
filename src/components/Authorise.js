import React from "react";
import { Link } from "react-router-dom";

const Authorised = ({ authorised, children }) => {
  if (!authorised) {
    return (
      <div>
        you are not authorised to view this page
        <br />
        <Link to="/">Visit our menu</Link>
      </div>
    );
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Authorised;
