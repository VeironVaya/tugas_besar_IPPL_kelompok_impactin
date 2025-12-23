import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

/* ================= REQUEST ================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url.includes("/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE ================= */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // 🔥 TOKEN EXPIRED / INVALID
      localStorage.removeItem("token");
      window.location.href = "/Login_adm";
    }
    return Promise.reject(err);
  }
);

/* ================= AUTH ================= */
export const loginApi = (username, password) => {
  return api.post("/api/admin/login", {
    username,
    password,
  });
};

export default api;