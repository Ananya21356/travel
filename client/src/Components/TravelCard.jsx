import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTravel } from "../Services/api";
import { getTripImage } from "../utils/tripImage";

export default function TravelCard({ travel, token, onDeleted, darkMode }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Favourites via localStorage
  const favKey = `fav_${travel._id}`;
  const [fav, setFav] = useState(() => localStorage.getItem(favKey) === "true");

  const toggleFav = (e) => {
    e.stopPropagation();
    const next = !fav;
    setFav(next);
    localStorage.setItem(favKey, next);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${travel.title}"? This cannot be undone.`)) return;
    try {
      setDeleting(true);
      await deleteTravel(travel._id, token);
      onDeleted();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete");
      setDeleting(false);
    }
  };

  // Extract clean place name for map query
  const placeName = encodeURIComponent(travel.title || "India");
  const mapSrc = `https://www.google.com/maps?q=${placeName}&output=embed`;

  return (
    <>
      {/* ── Confirm Visit Modal ── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className={`w-full max-w-sm rounded-3xl p-8 shadow-2xl border text-center
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-white/40"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">✈️</div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Plan This Trip?
            </h3>
            <p className={`text-sm mb-6 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Are you sure you want to proceed with the travel plan for{" "}
              <span className="font-bold text-indigo-500">"{travel.title}"</span>?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  alert(`🎉 Trip to "${travel.title}" confirmed! Have a great journey!`);
                }}
                className="px-6 py-3 vibrant-gradient text-white font-bold rounded-2xl hover:scale-105 transition-all text-sm"
              >
                ✅ Yes, Confirm!
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:scale-105
                  ${darkMode ? "border-gray-600 text-slate-300" : "border-slate-200 text-slate-600"}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`travel-card rounded-3xl overflow-hidden cursor-pointer group
          ${darkMode
            ? "bg-gray-800/80 border border-gray-700/50 shadow-lg hover:shadow-indigo-900/30"
            : "bg-white/80 border border-white/40 shadow-lg hover:shadow-indigo-100"
          }`}
        onClick={() => navigate(`/trip/${travel._id}`)}
      >
        {/* ── Image ── */}
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={getTripImage(travel)}
            alt={travel.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800";
            }}
          />

          {/* Adventure badge */}
          <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 border border-white/30">
            🧭 Adventure
          </div>

          {/* Favourite heart */}
          <button
            onClick={toggleFav}
            title={fav ? "Remove from favourites" : "Add to favourites"}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg
              backdrop-blur-md border transition-all hover:scale-125
              ${fav
                ? "bg-red-500/90 border-red-400 text-white"
                : "bg-white/70 border-white/30 text-slate-400 hover:text-red-400"
              }`}
          >
            {fav ? "❤️" : "🤍"}
          </button>
        </div>

        {/* ── Content ── */}
        <div className="p-6">
          {/* Date */}
          <p className={`text-xs mb-2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {new Date(travel.createdAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </p>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-2 truncate group-hover:text-indigo-500 transition-colors
            ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            {travel.title}
          </h3>

          {/* Description */}
          <p className={`text-sm line-clamp-3 leading-relaxed mb-4
            ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            {travel.description}
          </p>

          {/* ── Google Map toggle ── */}
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMap((v) => !v)}
              className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all
                ${darkMode
                  ? "bg-gray-700 text-slate-300 hover:bg-gray-600"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              🗺️ {showMap ? "Hide Map" : "View on Map"}
            </button>

            {showMap && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-44">
                <iframe
                  title={`Map of ${travel.title}`}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className={`flex items-center justify-between pt-4 border-t
            ${darkMode ? "border-gray-700" : "border-slate-100"}`}
          >
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full vibrant-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
                {travel.author?.name?.charAt(0).toUpperCase() || "E"}
              </div>
              <span className={`text-xs font-semibold truncate max-w-[80px]
                ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {travel.author?.name || "Explorer"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {/* Confirm Visit */}
              <button
                onClick={() => setShowConfirm(true)}
                className="text-xs font-bold text-green-500 hover:text-green-700 transition-colors"
              >
                📌 Plan Trip
              </button>

              {token && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-xs font-bold text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                >
                  {deleting ? "..." : "🗑 Delete"}
                </button>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/trip/${travel._id}`); }}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
              >
                Read more →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
