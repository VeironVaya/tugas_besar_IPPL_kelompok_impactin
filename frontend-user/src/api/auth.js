import api from "./api";

// REGISTER
export const registerAPI = async (payload) => {
  const res = await api.post("/user/register", payload);
  return res.data;
};

// LOGIN
export const loginAPI = async (payload) => {
  const res = await api.post("/user/login", payload);
  return res.data; // pastikan BE kirim token
};

