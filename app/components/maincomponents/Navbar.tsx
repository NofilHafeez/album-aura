"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  return (
    <nav className="w-full px-10 py-4 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg fixed top-0 z-50">
      {/* Logo */}
      <motion.a
        href="/"
        className="text-2xl font-extrabold text-white tracking-wide"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        AlbumAura
      </motion.a>

      {/* Mobile Menu Icon */}
      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu className="text-white w-6 h-6 cursor-pointer" />
      </div>

      {/* Profile & CTA */}
      <div
        className={`md:flex items-center gap-6 ${menuOpen ? "flex" : "hidden"} absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 md:flex-row flex-col md:items-center`}
      >
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          <Image
            className="w-full h-full object-cover"
            src=""
            alt="Profile"
            width={48}
            height={48}
          />
          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-10 mt-2 w-40 bg-white text-black rounded-lg ">
              <button className="block w-full text-left px-4 py-2 hover:bg-red-700">Dashboard</button>
            </div>
          )}
        </div>
        
        {isLoggedIn ? (
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-xl shadow-md transition-all"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition-all"
            onClick={() => setIsLoggedIn(true)}
          >
            Login
          </button>
        )}
        
        {/* Dashboard button in mobile menu */}
        {menuOpen && (
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition-all mt-2 w-full text-left">Dashboard</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;