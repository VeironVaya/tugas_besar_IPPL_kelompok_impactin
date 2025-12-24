import api from "./api";

export const getProfileAPI = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const updateProfileAPI = async (payload) => {
  const res = await api.patch("/user/profile", payload);
  return res.data;
};