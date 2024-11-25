// src/redux/reducers/authReducer.js
import { LOGIN, LOGOUT } from "./action";

// Get persisted data from localStorage (if available)
const persistedState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // Ensure it returns a boolean
  user: JSON.parse(localStorage.getItem("user")) || null, // Parse user data from localStorage
};

// Initial state (fall back to persisted data or default initial state)
const initialState = persistedState.isAuthenticated
  ? persistedState
  : {
      isAuthenticated: false,
      user: null,
    };

// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // Persist data in localStorage on login
      localStorage.setItem("isAuthenticated", "true");  // Set isAuthenticated to true
      localStorage.setItem("user", JSON.stringify(action.payload));  // Store user data

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,  // Store user data from payload
      };

    case LOGOUT:
      // Remove data from localStorage on logout
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");

      return {
        ...state,
        isAuthenticated: false,
        user: null,  // Clear user data on logout
      };

    default:
      return state;
  }
};

export default authReducer;
