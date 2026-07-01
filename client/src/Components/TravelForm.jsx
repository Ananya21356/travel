import { useState } from "react";
import { addTravel } from "../Services/api";
import { getTripImage } from "../utils/tripImage";

export default function TravelForm({ token, onAdded, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Live preview of the image that will be used
  const previewImage = getTripImage({ title, description, image, images: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await addTravel({ title, description, image, images: [] }, token);
      setTitle("");
      setDescription("");
      setImage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onAdded();
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to add story";
      console.error("Add trip error:", err.response?.status, msg);
      setError(msg);
    }
  };

  const inputClass = `w-full px-5 py-3 rounded-xl text-sm outline-none transition-all
    ring-1 focus:ring-2 focus:ring-indigo-500
    ${darkMode
      ? "bg-gray-700 ring-gray-600 text-slate-200 placeholder:text-slate-500"
      : "bg-white/70 ring-slate-200 text-slate-800 placeholder:text-slate-400"
    }`;

  const labelClass = `text-xs font-bold uppercase tracking-widest ml-1
    ${darkMode ? "text-slate-400" : "text-slate-500"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold border border-red-100 animate-shake">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-semibold border border-green-100 animate-fade-in">
          ✅ Trip posted successfully!
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <label className={labelClass}>Destination Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Where did you go? (e.g. Goa, Manali, Paris)"
          className={inputClass}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className={labelClass}>Your Story</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What made it special? Describe the sights, sounds, and feelings..."
          className={`${inputClass} min-h-[120px] resize-none`}
          required
        />
      </div>

      {/* Image URL — optional */}
      <div className="space-y-2">
        <label className={labelClass}>
          Image URL{" "}
          <span className={`normal-case font-normal tracking-normal ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            (optional — auto-selected if left blank)
          </span>
        </label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/my-trip-photo.jpg"
          className={inputClass}
          type="text"
        />
      </div>

      {/* Live image preview */}
      {(title || image) && (
        <div className="space-y-2">
          <p className={labelClass}>Image Preview</p>
          <div className="h-36 rounded-2xl overflow-hidden border border-white/20 shadow-inner">
            <img
              src={previewImage}
              alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
          {!image && title && (
            <p className={`text-xs ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              🤖 Auto-selected based on your title
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 vibrant-gradient text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest"
      >
        🚀 Post Discovery
      </button>
    </form>
  );
}
