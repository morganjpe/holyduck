import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthError = ({ error: { message } }) => (
  <div>
    <h4>You are not authorised to view this page</h4>
    <p>There has been an error : {message}</p>
    <br />
    <Link to="/login">Login</Link>
  </div>
);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    status: "pending",
    error: null,
    user: null,
  });
  // auth initial load
  useEffect(() => {
    console.log(state);
    if (state.status === "pending") {
      axios
        .get("https://holy-duck-server-42v9n.ondigitalocean.app/authorise", {
          headers: {
            token: window.localStorage.getItem("token"), // jwt token
          },
        })
        .then((res) => {
          if (res.status === 200) {
            return setState({ ...state, user: res.data, status: "success" });
          }
          return setState({
            status: "error",
            error: { message: res.status },
            user: null,
          });
        })
        .catch((error) => setState({ status: "error", error, user: null }));
    } else if (state.error) {
      window.localStorage.removeItem("token");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        "Loading..."
      ) : state.status === "error" ? (
        <AuthError error={state.error} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const state = useContext(AuthContext);
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
};
