import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginSignup from "./components/loginsignup";
import Home from "./Home";  // Import your Home component
import { selectIsAuthenticated } from "./redux/selector";  // Import the selector to check if the user is authenticated

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);  // Get authentication state

  return (
    <Routes>
      {/* If the user is authenticated, redirect to /home, otherwise show LoginSignup */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Home /> : <LoginSignup />} 
      />

      {/* Only show Home route if user is authenticated */}
      <Route 
        path="/home" 
        element={isAuthenticated ? <Home /> : <LoginSignup />} 
      />
    </Routes>
  );
}

export default App;
