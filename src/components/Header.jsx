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
      {/* Desktop & Mobile Header */}
      <header className="bg-yellow-500 text-white flex justify-between items-center p-4 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <p className="text-lg font-semibold">Social Media</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-lg">
          <Link to="/" className="hover:text-gray-200 flex items-center gap-1">
            <AiOutlineHome /> Home
          </Link>
          <Link to="/messages" className="hover:text-gray-200 flex items-center gap-1">
            <AiOutlineMessage /> Messages
          </Link>
          <Link to="/notifications" className="hover:text-gray-200 flex items-center gap-1">
            <AiOutlineBell /> Notifications
          </Link>
          <Link to="/profile" className="hover:text-gray-200 flex items-center gap-1">
            <AiOutlineUser /> Profile
          </Link>
          <Link to="/settings" className="hover:text-gray-200 flex items-center gap-1">
            <AiOutlineSetting /> Settings
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-2xl">
          {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col bg-yellow-600 text-white p-4 space-y-3">
          <Link to="/" className="flex items-center gap-1">
            <AiOutlineHome /> Home
          </Link>
          <Link to="/messages" className="flex items-center gap-1">
            <AiOutlineMessage /> Messages
          </Link>
          <Link to="/notifications" className="flex items-center gap-1">
            <AiOutlineBell /> Notifications
          </Link>
          <Link to="/profile" className="flex items-center gap-1">
            <AiOutlineUser /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-1">
            <AiOutlineSetting /> Settings
          </Link>
          <Link to="/logout" className="flex items-center gap-1 text-red-200">
            <AiOutlineLogout /> Logout
          </Link>
        </nav>
      )}
    </>
  );
}
