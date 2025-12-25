import api from "./api";

export const getProfileAPI = async (userId) => {
  const res = await api.get(`/user/profile/${userId}`);
  return res.data;
};

export const updateProfileAPI = async (payload) => {
  const res = await api.patch("/user/profile", payload);
  return res.data;
};

export const changePasswordAPI = async (payload) => {
  const res = await api.patch("/user/profile/password", payload);
  return res.data;
};
