import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-3">
            <button onClick={toggleMobileMenu} className="sm:hidden">
              <AiOutlineMenu className="text-gray-700 text-2xl" />
            </button>
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-bold text-gray-800 hidden sm:block">
              SocialApp
            </span>
          </div>

          {/* Center: Search Bar (Hidden on Small Screens) */}
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/3">
            <AiOutlineSearch className="text-gray-500 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          {/* Right: Icons + Profile */}
          <div className="flex items-center space-x-4">
            <Link to="/home" className="hidden sm:block">
              <AiOutlineHome className="text-gray-700 text-2xl" />
            </Link>
            <Link to="/messages" className="hidden sm:block">
              <AiOutlineMessage className="text-gray-700 text-2xl" />
            </Link>
            <Link to="/notifications" className="hidden sm:block">
              <AiOutlineBell className="text-gray-700 text-2xl" />
            </Link>

            {/* User Avatar */}
            <button>
              <img src="/user.jpg" alt="User" className="w-10 h-10 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Drawer for Mobile */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        {/* Close Button */}
        <button onClick={toggleMobileMenu} className="absolute top-5 right-5">
          <AiOutlineClose className="text-gray-700 text-3xl" />
        </button>

        {/* Navigation Links */}
        <nav className="text-center space-y-6 text-gray-800 text-lg">
          <Link to="/home" onClick={toggleMobileMenu} className="flex items-center space-x-3">
            <AiOutlineHome className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link to="/messages" onClick={toggleMobileMenu} className="flex items-center space-x-3">
            <AiOutlineMessage className="text-2xl" />
            <span>Messages</span>
          </Link>
          <Link to="/notifications" onClick={toggleMobileMenu} className="flex items-center space-x-3">
            <AiOutlineBell className="text-2xl" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* User Menu */}
        <div className="mt-8 text-gray-600 space-y-4">
          <button className="flex items-center space-x-3">
            <AiOutlineUser className="text-xl" />
            <span>Profile</span>
          </button>
          <button className="flex items-center space-x-3">
            <AiOutlineSetting className="text-xl" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-3 text-red-500">
            <AiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
