const Header = () => (
    <header className="bg-black text-white p-4 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="text-2xl font-bold">
        Media<span className="text-yellow-400">X</span>
      </div>
  
      {/* Middle: Navigation Links */}
      <nav className="space-x-8 text-lg">
        <a
          href="#home"
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="#about"
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          About Us
        </a>
      </nav>
  
      {/* Right: Profile */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40" // Replace with the user's profile image link
          alt="User Profile"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
        <span className="hidden sm:inline-block hover:text-yellow-400 transition-colors duration-300">
          Profile
        </span>
      </div>
    </header>
  );
  
  export default Header;
  