import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ⬅️ PAKAI PROXY VITE
  headers: {
    "Content-Type": "application/json",
  },
});

// otomatis sisipkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// optional: handle response error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);


export default api;
