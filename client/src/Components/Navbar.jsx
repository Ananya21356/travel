import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, onLogout, darkMode, onToggleDark }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <div
        className={`px-6 py-4 rounded-2xl flex justify-between items-center shadow-2xl backdrop-blur-xl border transition-colors duration-300
          ${darkMode
            ? "bg-gray-900/80 border-gray-700/50 text-slate-100"
            : "bg-white/40 border-white/40 text-slate-700"
          }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          ✈️ TravelLog
        </Link>

        {/* Nav links */}
        <div className="flex gap-6 items-center text-sm font-semibold">
          <Link
            to="/"
            className={`hover:text-indigo-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-700"}`}
          >
            Home
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            title="Toggle dark mode"
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110
              ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-slate-100 text-slate-600"}`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-105 hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`hover:text-indigo-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 vibrant-gradient text-white rounded-full shadow-lg shadow-indigo-200 hover:scale-105 transition-all"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
