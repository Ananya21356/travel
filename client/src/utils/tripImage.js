/**
 * Returns the best image URL for a trip.
 * Priority: trip.image → trip.images[0] → keyword-based fallback → generic fallback
 */

const keywordMap = [
  // Beaches
  {
    keywords: ["goa", "beach", "sea", "ocean", "coast", "shore", "maldives", "bali", "phuket", "miami", "hawaii", "andaman", "lakshadweep"],
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  },
  // Mountains / Snow / Hills
  {
    keywords: ["manali", "mountain", "himalayas", "snow", "peak", "trek", "shimla", "leh", "ladakh", "alps", "everest", "kashmir", "himachal", "uttarakhand", "mussoorie", "darjeeling", "sikkim", "arunachal"],
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  },
  // City / Urban
  {
    keywords: ["paris", "london", "new york", "dubai", "singapore", "tokyo", "city", "urban", "metro", "mumbai", "delhi", "bangalore", "hyderabad", "chennai", "kolkata", "pune", "ahmedabad", "jaipur"],
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
  },
  // Forest / Nature / Wildlife
  {
    keywords: ["forest", "jungle", "wildlife", "safari", "amazon", "coorg", "wayanad", "nature", "green", "valley", "jim corbett", "ranthambore", "kaziranga"],
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
  },
  // Desert
  {
    keywords: ["desert", "sahara", "rajasthan", "jaisalmer", "sand", "dune", "bikaner", "thar"],
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800",
  },
  // Temples / Heritage / History
  {
    keywords: ["temple", "heritage", "history", "ancient", "fort", "palace", "hampi", "varanasi", "agra", "taj", "mahal", "mysore", "puri", "tirupati", "madurai", "golden"],
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800",
  },
  // Waterfall / Lakes / Backwaters
  {
    keywords: ["waterfall", "lake", "river", "backwater", "kerala", "ooty", "kodaikanal", "nainital", "munnar", "alleppey", "kumarakom", "coorg"],
    url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
  },
  // Road trip / Highway
  {
    keywords: ["road trip", "drive", "highway", "route", "road"],
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
  },
  // Spiritual / Pilgrimage
  {
    keywords: ["spiritual", "pilgrimage", "holy", "rishikesh", "haridwar", "amritsar", "golden temple", "shirdi", "tirupati"],
    url: "https://images.unsplash.com/photo-1561361058-c24e01238a46?auto=format&fit=crop&q=80&w=800",
  },
  // Island / Tropical
  {
    keywords: ["island", "tropical", "resort", "lagoon", "coral", "reef"],
    url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800",
  },
];

const GENERIC_FALLBACK =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800";

// Check if a string is a valid non-empty URL
function isValidUrl(str) {
  return typeof str === "string" && str.trim().length > 0 && str.trim().startsWith("http");
}

export function getTripImage(travel) {
  // 1. Use explicitly provided single image field
  if (isValidUrl(travel.image)) return travel.image.trim();

  // 2. Use first valid item from images array (legacy)
  if (Array.isArray(travel.images)) {
    const first = travel.images.find((img) => isValidUrl(img));
    if (first) return first.trim();
  }

  // 3. Smart keyword match on title + description
  const text = `${travel.title || ""} ${travel.description || ""}`.toLowerCase();
  for (const entry of keywordMap) {
    if (entry.keywords.some((kw) => text.includes(kw))) {
      return entry.url;
    }
  }

  // 4. Generic travel fallback
  return GENERIC_FALLBACK;
}
