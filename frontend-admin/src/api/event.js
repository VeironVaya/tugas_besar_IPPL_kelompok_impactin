import api from "./api";

// Get all pending events
export const getPendingEvents = () => {
  return api.get("/admin/events?status=pending");
};

// Get all approved events
export const getApprovedEvents = () => {
  return api.get("/admin/events?status=approved");
};

// Get all declined events
export const getDeclinedEvents = () => {
  return api.get("/admin/events?status=declined");
};

// Get detail of a specific pending event (for approval)
export const getEventApprovalDetail = (event_id) => {
  return api.get(`/admin/events/${event_id}?status=pending`);
};

// Get detail of a specific pending event (for approval)
export const getEventApprovedDetail = (event_id) => {
  return api.get(`/admin/events/${event_id}?status=approved`);
};

export const getEventDeclinedDetail = (event_id) => {
  return api.get(`/admin/events/${event_id}?status=declined`);
};

// Patch/update event status (accept/reject)
export const updateEventStatus = (event_id, action) => {
  return api.patch(`/admin/events/approval/${event_id}`, { action });
};
