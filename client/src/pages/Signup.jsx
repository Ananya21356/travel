import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../Services/api";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const darkMode = document.body.classList.contains("dark");

  const submit = async () => {
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await signup(data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-6 py-4 rounded-2xl text-sm outline-none transition-all
    ring-1 focus:ring-2 focus:ring-indigo-500
    ${darkMode
      ? "bg-gray-700 ring-gray-600 text-slate-200 placeholder:text-slate-500"
      : "bg-slate-50 ring-slate-100 text-slate-800 placeholder:text-slate-300"
    }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden
      ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}
    >
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 vibrant-gradient rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className={`w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl relative z-10 border animate-fade-up
        ${darkMode
          ? "bg-gray-800/90 border-gray-700"
          : "bg-white/80 backdrop-blur-lg border-white/50"
        }`}
      >
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className={`text-4xl font-black mb-2 tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
            Create Account
          </h2>
          <p className={`font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Begin your journey today.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-[0.2em] ml-2 ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
              Full Name
            </label>
            <input
              placeholder="Your Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-[0.2em] ml-2 ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="explorer@travel.com"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-[0.2em] ml-2 ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={inputClass}
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-4 vibrant-gradient text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Explorer Profile →"}
          </button>
        </div>

        <p className={`text-center mt-8 text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
          Have an account?{" "}
          <a href="/login" className="text-indigo-500 font-bold hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
