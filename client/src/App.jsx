import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripDetail from "./pages/TripDetail";

export default function App() {
  // Validate token on load — clear if expired
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token");
    if (!stored) return "";
    try {
      const payload = JSON.parse(atob(stored.split(".")[1]));
      // If token has expiry and it's past, clear it
      if (payload.exp && Date.now() / 1000 > payload.exp) {
        localStorage.removeItem("token");
        return "";
      }
      return stored;
    } catch {
      localStorage.removeItem("token");
      return "";
    }
  });
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Apply / remove dark class on <body>
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <BrowserRouter>
      <Navbar
        token={token}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />
      <Routes>
        <Route path="/" element={<Home token={token} darkMode={darkMode} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trip/:id" element={<TripDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
