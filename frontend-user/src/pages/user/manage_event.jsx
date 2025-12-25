import React, { useState, useEffect } from "react";
import Header from "../../components/navbar.jsx";
import api from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";

const ManageEventPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  /* ================= STATE ================= */
  const [loading, setLoading] = useState(true);

  const [eventDetail, setEventDetail] = useState({
    title: "",
    location: "",
    date: "",
    maxCapacity: 0,
    subStatus: "opened",
  });

  const [applicants, setApplicants] = useState([]);
  const [participants, setParticipants] = useState([]);

  /* ================= FETCH EVENT (HOST) ================= */
  const fetchEventDetail = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/user/events/your/${id}`);
      const e = res.data;

      // ✅ EVENT HEADER
      setEventDetail({
        title: e.title,
        location: e.location,
        date: new Date(e.start_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        maxCapacity: e.max_participant,
        subStatus: e.sub_status,
      });

      // ✅ APPLICANTS
      setApplicants(
        (e.applicants || []).map((a) => ({
          id: a.user_id,
          name: a.name,
        }))
      );

      // ✅ PARTICIPANTS
      setParticipants(
        (e.participants || []).map((p) => ({
          id: p.user_id,
          name: p.name,
        }))
      );
    } catch (err) {
      alert("Failed to load event detail");
      console.error(err);
    } finally {
      setLoading(false); // 🔥 INI YANG KAMU LUPA
    }
  };

  const approveApplicant = async (userId) => {
    try {
      await api.patch(`/user/events/applicants/${id}`, {
        user_id: userId,
        action: "approve",
      });

      fetchEventDetail(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve applicant");
      console.error(err);
    }
  };

  const removeParticipant = async (userId) => {
    try {
      await api.delete(`/user/events/participants/${id}`, {
        data: {
          user_id: userId,
        },
      });

      fetchEventDetail(); // refresh list + counter
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove participant");
      console.error(err);
    }
  };

  const rejectApplicant = async (userId) => {
    try {
      await api.patch(`/user/events/applicants/${id}`, {
        user_id: userId,
        action: "reject",
      });

      fetchEventDetail(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject applicant");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  /* ================= EVENT CONTROL ================= */
  const handleOpenEvent = async () => {
    try {
      const res = await api.patch(`/user/events/open/${id}`);
      setEventDetail((prev) => ({
        ...prev,
        subStatus: res.data.sub_status,
      }));
    } catch {
      alert("Failed to open event");
    }
  };

  const handleCloseEvent = async () => {
    try {
      const res = await api.patch(`/user/events/close/${id}`);
      setEventDetail((prev) => ({
        ...prev,
        subStatus: res.data.sub_status,
      }));
    } catch {
      alert("Failed to close event");
    }
  };

  const handleCancelEvent = async () => {
    if (!window.confirm("Cancel this event?")) return;

    try {
      const res = await api.patch(`/user/events/cancel/${id}`);
      setEventDetail((prev) => ({
        ...prev,
        subStatus: res.data.sub_status,
      }));
    } catch {
      alert("Failed to cancel event");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          Loading event detail...
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 p-6 mt-20">
        <div className="w-full bg-white p-10 rounded-xl shadow-lg">
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-green-700">
              {eventDetail.title}
            </h1>
            <p className="text-gray-700">{eventDetail.location}</p>
            <p className="text-gray-500 text-sm">{eventDetail.date}</p>

            <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300 w-fit">
              <p className="font-semibold text-green-700">
                Participants: {participants.length} / {eventDetail.maxCapacity}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mb-8">
            {eventDetail.subStatus !== "cancelled" && (
              <>
                {eventDetail.subStatus === "opened" ? (
                  <button
                    onClick={handleCloseEvent}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                  >
                    Close Event
                  </button>
                ) : (
                  <button
                    onClick={handleOpenEvent}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg"
                  >
                    Open Event
                  </button>
                )}
              </>
            )}

            <button
              onClick={handleCancelEvent}
              disabled={eventDetail.subStatus === "cancelled"}
              className={`px-4 py-2 rounded-lg text-white ${
                eventDetail.subStatus === "cancelled"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600"
              }`}
            >
              Cancel Event
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* APPLICANTS */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-[500px] overflow-y-auto">
              <h2 className="font-bold text-xl mb-3">
                Applicants ({applicants.length})
              </h2>

              {applicants.length === 0 && (
                <p className="text-gray-500">No pending applicants.</p>
              )}

              {applicants.map((a) => (
                <div
                  key={a.id}
                  className="border p-4 rounded-lg flex justify-between items-center bg-white"
                >
                  <p
                    onClick={() => navigate(`/profile/${a.id}`)}
                    className="font-semibold text-green-700 cursor-pointer hover:underline"
                  >
                    {a.name}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => approveApplicant(a.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectApplicant(a.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PARTICIPANTS */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-[500px] overflow-y-auto">
              <h2 className="font-bold text-xl mb-3">
                Participants ({participants.length})
              </h2>

              {participants.length === 0 && (
                <p className="text-gray-500">No participants yet.</p>
              )}

              {participants.map((p) => (
                <div
                  key={p.id}
                  className="border p-4 rounded-lg bg-green-50 flex justify-between items-center"
                >
                  <p
                    onClick={() => navigate(`/profile/${p.id}`)}
                    className="font-semibold text-green-700 cursor-pointer hover:underline"
                  >
                    {p.name}
                  </p>

                  <button
                    onClick={() => removeParticipant(p.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEventPage;
