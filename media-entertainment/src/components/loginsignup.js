
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { selectIsAuthenticated } from "../redux/selector";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/action";
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // Initialize useNavigate
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = response.data;
      dispatch(login({ token, user }));
      console.log(isAuthenticated)
      console.log("Response:", response.data);
      navigate("/home");  // Navigate to home page
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login Failed. Please check your credentials.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        username: formData.username, // Update key to match backend
        email: formData.email,
        password: formData.password
      });
      console.log(response.data); // Log the actual response data
      alert("Signup Successful! Please log in.");
      toggleForm();
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Panel for Welcome/Login Message */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-semibold text-gray-800">{isLogin ? "Welcome Back!" : "Hello, Friend!"}</h3>
          <p className="text-lg text-gray-600">{isLogin ? "Log in to continue." : "Sign up to join us."}</p>
          <button onClick={toggleForm} className="mt-4 text-blue-500 hover:text-blue-700">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        {/* Form for Login/Signup */}
        <div className={`${isLogin ? "block" : "hidden"} mb-6`}>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Sign Up</span>
            </p>
          </form>
        </div>

        {/* Form for Signup */}
        <div className={`${!isLogin ? "block" : "hidden"}`}>
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700">
              Sign Up
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
