// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer";  // Import the auth reducer

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    auth: authReducer, // Add your auth reducer
  },
});

export default store;
