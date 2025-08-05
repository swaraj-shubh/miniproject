import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.URL || "https://secondserve.onrender.com/api" ||  "http://localhost:8000/api",
  withCredentials: true, // if you're using cookies for auth
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;
// ======= Auth APIs =======
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// ======= User APIs =======
export const getUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (data) => API.put("/users/profile", data);
export const getAllUsersForDonor = () => API.get("/users/allHehe"); 

// ======= Food APIs =======
export const getDonatedFoods = () => API.get("/foods/donated");
export const getReceivedFoods = () => API.get("/foods/received");
export const getFoodById = (id) => API.get(`/foods/${id}`);
export const reserveFood = (id) => API.put(`/foods/${id}/reserve`);
export const getAvailableFoods = () => API.get("/foods/donate")

// ======= Admin APIs =======
export const fetchAllUsers = () => API.get("/users/all");               // GET all users (admin only)
export const deleteUserById = (userId) => API.delete(`/users/${userId}`); // DELETE user (admin only)
export const admin = () => API.get("/foods/admin")