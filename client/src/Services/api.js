// src/Services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Auth
export const login = (credentials) => api.post("/auth/login", credentials);
export const signup = (credentials) => api.post("/auth/signup", credentials);

// Travels
export const getTravels = (token) =>
  api.get("/travels", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const getTravelById = (id) => api.get(`/travels/${id}`);

export const addTravel = (travelData, token) =>
  api.post("/travels", travelData, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTravel = (id, token) =>
  api.delete(`/travels/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
