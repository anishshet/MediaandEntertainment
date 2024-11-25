// src/redux/selectors/authSelectors.js

// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Selector to get the current logged-in user data
export const selectUser = (state) => state.auth.user;
