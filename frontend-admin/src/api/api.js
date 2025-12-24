// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative path for Vite proxy
});

/* ===== REQUEST INTERCEPTOR ===== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url.includes("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===== RESPONSE INTERCEPTOR ===== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/Login_adm";
    }
    return Promise.reject(error);
  }
);

export default api;
