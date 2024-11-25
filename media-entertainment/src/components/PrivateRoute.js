// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/selector";// Selector for checking authentication

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);  // Get the authentication state

  // If user is not authenticated, redirect to login/signup page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element; // If authenticated, render the element (home page)
};

export default PrivateRoute;
