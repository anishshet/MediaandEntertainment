import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/action";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  

  const handleLogout = () => {
    // Clear any authentication information here (e.g., remove token or user data)
    localStorage.removeItem("userToken");  // Assuming you're using localStorage for token storage

    // Redirect to the login/signup page after logging out
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between p-4 fixed w-full top-0 z-10">
      {/* Left Section - MediaX */}
      <div className="text-3xl font-bold">
        <Link to="/" className="hover:text-gray-400">MediaX</Link>
      </div>

      {/* Center Section - About and Contact Us */}
      <div className="hidden md:flex flex-grow justify-center text-center">
        <Link to="/home" className="mx-6 hover:text-gray-400">Home</Link>
        <Link to="/about" className="mx-6 hover:text-gray-400">About</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right Section - Profile Dropdown */}
      <div className="relative hidden md:block">
        <button
          onClick={toggleDropdown}
          className="flex items-center bg-gray-800 p-2 rounded-full hover:bg-gray-600"
          aria-haspopup="true"
          aria-expanded={dropdownOpen ? "true" : "false"}
        >
          <span className="mr-2">Profile</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-md">
            
            <button
              onClick={handleLogout}  // Logout functionality
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center py-4">
          <Link to="/about" className="py-2 hover:bg-gray-600 w-full text-center">About</Link>
          <Link to="/contact" className="py-2 hover:bg-gray-600 w-full text-center">Contact Us</Link>
          <button className="py-2 hover:bg-gray-600 w-full text-center">Profile</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
