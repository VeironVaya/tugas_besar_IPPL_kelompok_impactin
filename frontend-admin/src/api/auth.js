// src/api/auth.js
import api from "./api";

export const loginApi = (username, password) => {
  return api.post("/admin/login", { username, password });
};

export const logoutApi = () => {
  localStorage.removeItem("token");
};
