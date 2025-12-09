import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";

const ManageEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy event detail – nanti ganti API
  const eventDetail = {
    title: "The Legend of Blue Sea",
    location: "Yogyakarta, Indonesia",
    date: "April, 2025",
    maxCapacity: 70,
  };

  // Dummy applicants
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Muhammad Rizqi", status: "pending" },
    { id: 2, name: "Nabila Azhari", status: "pending" },
    { id: 3, name: "Farhan Malik", status: "pending" },
  ]);

  const [participants, setParticipants] = useState([]);

  // Approve applicant
  const approveApplicant = (id) => {
    const selected = applicants.find((a) => a.id === id);

    setParticipants([...participants, { ...selected, status: "approved" }]);
    setApplicants(applicants.filter((a) => a.id !== id));
  };

  // Reject applicant
  const rejectApplicant = (id) => {
    setApplicants(applicants.filter((a) => a.id !== id));
  };

  // Remove participant
  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleCloseEvent = () => alert("Event Closed (dummy)");
  const handleCancelEvent = () => alert("Event Cancelled (dummy)");

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

            {/* QUOTA BOX */}
            <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300 w-fit">
              <p className="font-semibold text-green-700">
                Participants: {participants.length} / {eventDetail.maxCapacity}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleCloseEvent}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:opacity-90"
            >
              Close Event
            </button>

            <button
              onClick={handleCancelEvent}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90"
            >
              Cancel Event
            </button>

            <button
              onClick={() => navigate(-1)}
              className="ml-auto px-4 py-2 bg-gray-400 text-white rounded-lg hover:opacity-90"
            >
              Back
            </button>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* APPLICANTS */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-[500px] overflow-y-auto">
              <h2 className="font-bold text-xl mb-3">
                Applicants ({applicants.length})
              </h2>

              {applicants.length === 0 && (
                <p className="text-gray-500">No pending applicants.</p>
              )}

              <div className="space-y-3">
                {applicants.map((a) => (
                  <div
                    key={a.id}
                    className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm"
                  >
                    <div>
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-sm text-gray-500">Waiting for Approval</p>
                    </div>

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
            </div>

            {/* PARTICIPANTS */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-[500px] overflow-y-auto">
              <h2 className="font-bold text-xl mb-3">
                Participants ({participants.length})
              </h2>

              {participants.length === 0 && (
                <p className="text-gray-500">No participants yet.</p>
              )}

              <div className="space-y-3">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="border p-4 rounded-lg bg-green-50 flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <span className="text-green-700 font-bold text-sm">
                        Approved
                      </span>
                    </div>

                    <button
                      onClick={() => removeParticipant(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEventPage;
