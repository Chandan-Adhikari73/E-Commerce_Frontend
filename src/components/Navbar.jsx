import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="w-full shadow-lg bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          DMD Fashion
        </h1>

        {/* MENU LINKS */}
        <ul className="hidden md:flex space-x-10 text-gray-700 font-medium">
          {["Home", "Products", "Collections", "About", "Contact"].map((item) => (
            <li key={item} className="group relative">
              <span className="cursor-pointer transition-all duration-300 group-hover:text-purple-600 font-semibold">
                {item}
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6">
          {/* SEARCH */}
          <div className="relative">
            <FaSearch 
              className="text-gray-600 hover:text-purple-600 cursor-pointer transition-colors duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search products..."
                className="absolute right-0 top-10 w-64 p-3 rounded-lg border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 animate-slideDown"
                autoFocus
              />
            )}
          </div>

          {/* USER */}
          <FaUser className="text-gray-600 hover:text-purple-600 cursor-pointer transition-colors duration-300" />

          {/* CART ICON */}
          <div className="relative cursor-pointer group">
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors duration-300">
              <FaShoppingCart className="text-gray-700 group-hover:text-purple-600 transition-colors duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              2
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;