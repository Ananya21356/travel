import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTravelById } from "../Services/api";
import { getTripImage } from "../utils/tripImage";

// ── Known places to detect in trip descriptions ──
const KNOWN_PLACES = [
  // Punjab
  "Amritsar", "Ludhiana", "Chandigarh", "Jalandhar", "Patiala", "Bathinda",
  "Wagah Border", "Golden Temple",

  // Jammu & Kashmir
  "Srinagar", "Gulmarg", "Pahalgam", "Leh", "Ladakh", "Jammu", "Sonamarg",
  "Dal Lake", "Kashmir",

  // Himachal Pradesh
  "Manali", "Shimla", "Dharamshala", "Kasol", "Spiti", "Kullu", "Dalhousie",
  "Solang Valley", "Rohtang",

  // Uttarakhand
  "Rishikesh", "Haridwar", "Mussoorie", "Nainital", "Dehradun", "Auli",
  "Kedarnath", "Badrinath", "Jim Corbett",

  // Rajasthan
  "Jaipur", "Jodhpur", "Udaipur", "Jaisalmer", "Pushkar", "Ajmer",
  "Bikaner", "Ranthambore", "Desert Haveli",

  // Gujarat
  "Rann of Kutch", "Gir National Park", "Ahmedabad", "Surat", "Vadodara",
  "Somnath", "Dwarka", "Tent City",

  // Maharashtra
  "Mumbai", "Pune", "Lonavala", "Mahabaleshwar", "Aurangabad", "Nashik",
  "Shirdi", "Ajanta", "Ellora",

  // Goa
  "Goa", "Panaji", "Calangute", "Baga Beach", "Anjuna", "Old Goa Church",
  "Vagator", "Palolem",

  // Karnataka
  "Bangalore", "Mysore", "Coorg", "Hampi", "Mangalore", "Hubli",
  "Chikmagalur", "Badami",

  // Kerala
  "Kerala", "Munnar", "Alleppey", "Kochi", "Wayanad", "Kovalam",
  "Thekkady", "Varkala", "Thrissur",

  // Tamil Nadu
  "Ooty", "Kodaikanal", "Chennai", "Madurai", "Rameswaram", "Kanyakumari",
  "Mahabalipuram", "Thanjavur",

  // Andhra Pradesh
  "Tirupati", "Gandikota", "Visakhapatnam", "Vijayawada", "Araku Valley",

  // Telangana
  "Hyderabad", "Warangal", "Nagarjunasagar",

  // Odisha
  "Bhubaneswar", "Puri", "Konark",

  // West Bengal
  "Kolkata", "Darjeeling", "Sundarbans", "Digha",

  // Assam & North East
  "Kaziranga", "Guwahati", "Shillong", "Cherrapunji", "Meghalaya",
  "Tawang", "Ziro", "Majuli",

  // Tripura
  "Ujjayanta Palace", "Neermahal", "Agartala",

  // Delhi & NCR
  "Delhi", "Red Fort", "India Gate", "Qutub Minar", "Agra", "Taj Mahal",
  "Varanasi", "Mathura", "Vrindavan", "Lucknow", "Allahabad", "Prayagraj",

  // International
  "Paris", "London", "Dubai", "Singapore", "Bangkok", "Bali",
  "New York", "Tokyo", "Rome", "Barcelona", "Maldives", "Sri Lanka",
];

// Extract place names found in the description text
function extractPlaces(text) {
  if (!text) return [];
  const found = [];
  const lower = text.toLowerCase();
  for (const place of KNOWN_PLACES) {
    if (lower.includes(place.toLowerCase()) && !found.includes(place)) {
      found.push(place);
    }
  }
  return found;
}

// Google Maps embed URL
function mapEmbedUrl(place) {
  return `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
}

// Google Maps direct link (opens in new tab)
function mapDirectUrl(place) {
  return `https://www.google.com/maps/search/${encodeURIComponent(place)}`;
}

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMap, setActiveMap] = useState(null); // which place map is open

  const darkMode = document.body.classList.contains("dark");

  useEffect(() => {
    getTravelById(id)
      .then((res) => { setTravel(res.data); setLoading(false); })
      .catch(() => { setError("Trip not found."); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}>
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}>
        <div className={`p-10 rounded-3xl text-center border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-white/40"}`}>
          <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 vibrant-gradient text-white rounded-2xl font-bold">
            ← Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Combine title + description for place detection
  const combinedText = `${travel.title} ${travel.description}`;
  const detectedPlaces = extractPlaces(combinedText);

  return (
    <div className={`min-h-screen pt-28 pb-16 px-4 transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}>
      <div className="max-w-3xl mx-auto animate-fade-up">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-indigo-500 font-bold mb-8 hover:underline text-sm"
        >
          ← Back to Explorations
        </button>

        {/* Hero Image */}
        <div className="w-full h-80 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={getTripImage(travel)}
            alt={travel.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800";
            }}
          />
        </div>

        {/* Content Card */}
        <div className={`rounded-3xl p-10 shadow-xl border transition-colors duration-300
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white/80 backdrop-blur-lg border-white/40"}`}
        >
          <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-3 block">
            🧭 Adventure
          </span>

          <h1 className={`text-4xl font-extrabold mb-5 leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
            {travel.title}
          </h1>

          {/* Author & Date */}
          <div className={`flex items-center gap-3 mb-8 pb-6 border-b ${darkMode ? "border-gray-700" : "border-slate-100"}`}>
            <div className="w-11 h-11 rounded-full vibrant-gradient flex items-center justify-center text-white font-bold text-base shrink-0">
              {travel.author?.name?.charAt(0).toUpperCase() || "E"}
            </div>
            <div>
              <p className={`text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                {travel.author?.name || "Explorer"}
              </p>
              <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                {new Date(travel.createdAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className={`text-base leading-8 whitespace-pre-wrap mb-8 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            {travel.description}
          </p>

          {/* ── Places & Maps Section ── */}
          {detectedPlaces.length > 0 && (
            <div className={`mt-4 pt-8 border-t ${darkMode ? "border-gray-700" : "border-slate-100"}`}>
              <h2 className={`text-lg font-bold mb-5 flex items-center gap-2
                ${darkMode ? "text-white" : "text-slate-800"}`}
              >
                📍 Places in This Trip
              </h2>

              <div className="space-y-4">
                {detectedPlaces.map((place) => (
                  <div key={place}
                    className={`rounded-2xl border overflow-hidden
                      ${darkMode ? "border-gray-700 bg-gray-900/50" : "border-slate-200 bg-slate-50"}`}
                  >
                    {/* Place header row */}
                    <div className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📌</span>
                        <span className={`font-bold text-sm ${darkMode ? "text-white" : "text-slate-800"}`}>
                          {place}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Toggle embedded map */}
                        <button
                          onClick={() => setActiveMap(activeMap === place ? null : place)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all
                            ${activeMap === place
                              ? "bg-indigo-500 text-white"
                              : darkMode
                                ? "bg-gray-700 text-slate-300 hover:bg-gray-600"
                                : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                            }`}
                        >
                          {activeMap === place ? "Hide Map" : "🗺️ Show Map"}
                        </button>

                        {/* Direct link — opens Google Maps in new tab */}
                        <a
                          href={mapDirectUrl(place)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors"
                        >
                          Open in Maps ↗
                        </a>
                      </div>
                    </div>

                    {/* Embedded map — shown when toggled */}
                    {activeMap === place && (
                      <div className="h-64 w-full">
                        <iframe
                          title={`Map of ${place}`}
                          src={mapEmbedUrl(place)}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
