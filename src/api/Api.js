import axios from "axios";

const baseUrl = "http://localhost:8000/api";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  fetchOptions: false,
});

export const login = (email, password) =>
  api.post("/login", { email, password });

export const logout = (token) =>
  api.post("/logout", {}, { headers: { Authorization: `Bearer ${token}` } });

export const getOwnedRestaurants = (token) =>
  api.get("/restaurant/owned", { 
    headers: { Authorization: `Bearer ${token}` }
  });

export const getRestaurantDishes = (restaurantId, token) =>
  api.get(`/restaurant/${restaurantId}/dish`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRestaurantAddresses = (restaurantId, token) =>
  api.get(`/restaurant/${restaurantId}/address`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;