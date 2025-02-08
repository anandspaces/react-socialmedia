import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { FaSun, FaMoon } from "react-icons/fa";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition`}>
      <Router>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Theme Switcher */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Theme Selection
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* App Routes */}
          <div className="mt-6">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
