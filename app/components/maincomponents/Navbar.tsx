"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/UserContext";

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!user;  // much cleaner

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {  
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full px-10 py-3 flex items-center justify-between border-b-2 bg-black fixed top-0 z-50">
      {/* Logo */}
      <motion.a
        onClick={() => router.push("/")}
        className='text-3xl font-["Brush_Script_MT"] text-white tracking-wide cursor-pointer'
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

      {/* Right side menu */}
      <div
        className={`md:flex items-center gap-6 ${menuOpen ? "flex" : "hidden"} absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 flex-col md:flex-row`}
      >
        {isLoggedIn ? (
          <>
            {/* Username display */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-white px-4 py-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Hey, {user?.name || "User"} lets create! <ArrowRight className="inline-block" size={20} />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-black text-white rounded-lg shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 border-gray-100 border-2 hover:bg-zinc-700"
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 border-gray-100 border-x-2 border-b-2 hover:bg-zinc-700"
                    onClick={() => router.push("/collection")}
                  >
                    Create Collection
                  </button>
                  <button
                    className="block w-full text-left border-gray-100 border-x-2 border-b-2 px-4 py-2 hover:bg-red-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              className="border-white border-[1px] text-white px-4 py-1 shadow-md transition-all"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="border-white border-[1px] text-white px-4 py-1 shadow-md transition-all"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
