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

export const addExperienceAPI = (payload) => {
  return api.post("/user/profile/experience", payload);
};

export const deleteExperienceAPI = (id) => {
  return api.delete(`/user/profile/experience/${id}`);
};

export const editExperienceAPI = (id, payload) => {
  return api.patch(`/user/profile/experience/${id}`, payload);
};
