import api from "./api";

export const createEventAPI = async (payload) => {
  const res = await api.post("/user/events", payload);
  return res.data;
};

// GET ALL EVENTS (BARU)
export const getAllEventsAPI = async () => {
  const res = await api.get("/user/events");
  return res.data; // { data: [...], message }
};

export const getEventDetailAPI = async (eventId) => {
  const res = await api.get(`/user/events/${eventId}`);
  return res.data;
};

export const getEventsCarouselAPI = async () => {
  const res = await api.get("/user/events/carousel");
  return res.data;
};

export const getEventsAPI = async (params = {}) => {
  const res = await api.get("/user/events", {
    params,
  });
  return res.data;
};
