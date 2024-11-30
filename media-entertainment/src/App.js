import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginSignup from "./components/loginsignup";
import Home from "./Home"; // Import your Home component
import AboutUs from "./pages/AboutUs";
import { selectIsAuthenticated } from "./redux/selector"; // Import the selector to check if the user is authenticated
import TrendingInstagram from "./pages/TrendingInstagram";
import TrendingFacebook from "./pages/TrendingFacebook";
import TrendingTwitter from "./pages/TrendingTwitter";
import TrendingYouTube from "./pages/TrendingYouTube";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state

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
      
      {/* About Us Page */}
      <Route 
        path="/about" 
        element={<AboutUs />} 
      />
      
      {/* Other Routes */}
      <Route path="/trending-instagram" element={<TrendingInstagram />} />
      <Route path="/trending-twitter" element={<TrendingTwitter />} />
      <Route path="/trending-facebook" element={<TrendingFacebook />} />
      <Route path="/trending-youtube" element={<TrendingYouTube />} />
    </Routes>
  );
}

export default App;
