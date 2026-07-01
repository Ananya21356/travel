import { useEffect, useRef, useState } from "react";
import { getTravels } from "../Services/api";
import TravelCard from "../Components/TravelCard";
import TravelForm from "../Components/TravelForm";

export default function Home({ token, darkMode }) {
  const [travels, setTravels] = useState([]);
  const [search, setSearch] = useState("");
  const formRef = useRef(null);

  const fetchTravels = () => {
    getTravels(token)
      .then((res) => setTravels(res.data))
      .catch((err) => console.error("Failed to fetch travels:", err));
  };

  useEffect(() => {
    fetchTravels();
  }, [token]);

  // Filter by search — ALL trips shown when search is empty
  const filtered = travels.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  });

  const scrollToForm = () => {
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}>

      {/* ── Help Bar ── */}
      <div className={`w-full py-2 px-6 text-xs flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8
        ${darkMode ? "bg-gray-900 text-slate-400 border-b border-gray-800" : "bg-indigo-600 text-white"}`}
      >
        <span className="flex items-center gap-1.5">
          <span>📧</span>
          <span>support@travellog.com</span>
        </span>
        <span className={`hidden sm:block ${darkMode ? "text-gray-700" : "text-indigo-300"}`}>|</span>
        <span className="flex items-center gap-1.5">
          <span>📞</span>
          <span>+91 9876543210</span>
        </span>
        <span className={`hidden sm:block ${darkMode ? "text-gray-700" : "text-indigo-300"}`}>|</span>
        <span className="flex items-center gap-1.5">
          <span>🕐</span>
          <span>Mon–Sat, 9AM–6PM IST</span>
        </span>
      </div>

      <div className="pt-24 px-4">

        {/* ── Hero Section ── */}
        <section className="max-w-6xl mx-auto mb-14 animate-fade-up">
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl p-12 md:p-20 text-center
            ${darkMode
              ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 border border-gray-800"
              : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-white/60"
            }`}
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <span className="inline-block text-4xl mb-4">🌍</span>
            <h1 className={`text-5xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight
              ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Capture Your{" "}
              <span className="text-transparent bg-clip-text vibrant-gradient">
                Travel Memories
              </span>
            </h1>
            <p className={`max-w-xl mx-auto text-lg mb-10 leading-relaxed
              ${darkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Every journey tells a story. Log your adventures, relive your
              favourite moments, and inspire fellow explorers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {token ? (
                <button
                  onClick={scrollToForm}
                  className="px-10 py-4 vibrant-gradient text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all text-base"
                >
                  ＋ Add Trip
                </button>
              ) : (
                <a
                  href="/signup"
                  className="px-10 py-4 vibrant-gradient text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all text-base inline-block"
                >
                  Get Started Free
                </a>
              )}
              <a
                href="#explorations"
                className={`px-10 py-4 rounded-2xl font-bold border-2 transition-all hover:scale-105 text-base
                  ${darkMode
                    ? "border-gray-600 text-slate-300 hover:border-indigo-500"
                    : "border-slate-200 text-slate-600 hover:border-indigo-400"
                  }`}
              >
                Browse Trips ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── Add Trip Form (logged-in only) ── */}
        {token && (
          <section ref={formRef} className="max-w-2xl mx-auto mb-14 animate-fade-in">
            <div className={`rounded-3xl p-8 shadow-xl border transition-colors duration-300
              ${darkMode
                ? "bg-gray-800/80 border-gray-700"
                : "bg-white/80 border-white/60 backdrop-blur-lg"
              }`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
                📝 Share Your Story
              </h2>
              <TravelForm token={token} onAdded={fetchTravels} darkMode={darkMode} />
            </div>
          </section>
        )}

        {/* ── Featured banner (logged-out only) ── */}
        {!token && (
          <section className="max-w-6xl mx-auto mb-14 animate-fade-in">
            <div className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border
              ${darkMode ? "border-gray-700" : "border-white/60"}`}
            >
              <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  alt="Featured"
                />
              </div>
              <div className={`md:w-1/2 p-10 md:p-14 flex flex-col justify-center
                ${darkMode ? "bg-gray-800" : "bg-white/80 backdrop-blur-lg"}`}
              >
                <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-3">
                  Featured Story
                </span>
                <h2 className={`text-3xl font-black mb-4 leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                  Sunset over the Santorini Cliffs
                </h2>
                <p className={`leading-relaxed mb-8 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Experience the world through the eyes of others. Sign up to share
                  your own beautiful stories with our community.
                </p>
                <a
                  href="/signup"
                  className="w-fit px-8 py-3 vibrant-gradient text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
                >
                  Join Now
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── Trips Grid ── */}
        <section id="explorations" className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-1">
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                Recent Explorations
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                {filtered.length} trip{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search bar */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trips..."
                className={`w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all
                  ring-1 focus:ring-2 focus:ring-indigo-500
                  ${darkMode
                    ? "bg-gray-800 ring-gray-700 text-slate-200 placeholder:text-slate-500"
                    : "bg-white ring-slate-200 text-slate-800 placeholder:text-slate-400"
                  }`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Cards — ALL trips, no slicing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map((travel) => (
                <TravelCard
                  key={travel._id}
                  travel={travel}
                  token={token}
                  onDeleted={fetchTravels}
                  darkMode={darkMode}
                />
              ))
            ) : (
              <div className={`col-span-full py-20 text-center rounded-3xl border
                ${darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/60 border-white/40"}`}
              >
                <p className="text-5xl mb-4">🗺️</p>
                <p className={`font-medium ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
                  {search ? `No trips match "${search}"` : "No stories shared yet. Be the first!"}
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
