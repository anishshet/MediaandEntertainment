// src/redux/actions/authActions.js

// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Action creators

export const login = (userData) => {
  return {
    type: LOGIN,
    payload: userData,  // User data, such as { email, username, etc. }
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
