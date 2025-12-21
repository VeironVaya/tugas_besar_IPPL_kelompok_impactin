import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import avatarImg from "../../assets/photo avatar of user profile.png";
import Footer from "../../components/footer.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = {
    name: "Nabila Azhari",
    role: "Student",
    age: "20 Tahun",
    location: "Bandung, Indonesia",
    bio: "Saya adalah pecinta alam garis keras yang percaya bahwa Bumi butuh lebih banyak cinta dan aksi nyata!",
    skills: [
      "UI Design",
      "Communication",
      "Video Editing",
      "Leadership",
      "Photography",
      "Problem Solving",
    ],
  };

  const [tab, setTab] = useState("experience");

  // ================= EXPERIENCE STATE =================
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      title: "Aksi Tanam 1000 Mangrove",
      organizer: "Yayasan Laut Hijau",
      date: "April 2025",
      cover: MOCK_CARD_IMAGE,
    },
  ]);

  // ================= MODAL & FORM STATE =================
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    organizer: "",
    date: "",
    cover: null,
    coverPreview: null,
  });

  const resetForm = () => {
    setForm({
      title: "",
      organizer: "",
      date: "",
      cover: null,
      coverPreview: null,
    });
    setEditingId(null);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({
      ...form,
      cover: file,
      coverPreview: URL.createObjectURL(file),
    });
  };

  // ================= ADD / EDIT =================
  const handleSaveExperience = () => {
    if (!form.title || !form.organizer || !form.date) {
      alert("Judul, penyelenggara, dan tanggal wajib diisi!");
      return;
    }

    if (editingId) {
      setExperienceList((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title: form.title,
                organizer: form.organizer,
                date: form.date,
                cover: form.coverPreview || e.cover,
              }
            : e
        )
      );
    } else {
      setExperienceList((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: form.title,
          organizer: form.organizer,
          date: form.date,
          cover: form.coverPreview || MOCK_CARD_IMAGE,
        },
      ]);
    }

    resetForm();
    setShowModal(false);
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setForm({
      title: exp.title,
      organizer: exp.organizer,
      date: exp.date,
      cover: null,
      coverPreview: exp.cover,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus experience ini?")) {
      setExperienceList((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* ================= PROFILE HEADER ================= */}
          <div className="bg-gradient-to-r from-green-200 to-green-100 p-10 rounded-xl shadow-md">
            <div className="flex items-center gap-8">
              <img
                src={avatarImg}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />

              <div>
                <h1 className="text-3xl font-bold text-green-800">
                  {user.name}
                </h1>

                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {[user.role, user.age, user.location].map((item, i) => (
                    <span
                      key={i}
                      className="bg-green-700 text-white px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-green-900 italic">{user.bio}</p>
              </div>

              <button
                onClick={() => navigate("/edit_profile")}
                className="ml-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* ================= MAIN ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
            {/* LEFT */}
            <div className="bg-white p-6 shadow-md rounded-xl">
              <h2 className="font-bold text-green-800 text-lg mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-3 bg-white p-6 shadow-md rounded-xl">
              {/* Tabs */}
              <div className="flex border-b mb-5">
                <button
                  onClick={() => setTab("experience")}
                  className={`px-6 py-2 font-semibold ${
                    tab === "experience"
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-gray-500"
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setTab("impact")}
                  className={`px-6 py-2 font-semibold ${
                    tab === "impact"
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-gray-500"
                  }`}
                >
                  Experience Impactin
                </button>
              </div>

              {/* ================= USER EXPERIENCE ================= */}
              {tab === "experience" && (
                <>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowModal(true);
                    }}
                    className="mb-6 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                  >
                    + Add Experience
                  </button>

                  <div className="space-y-6">
                    {experienceList.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-5 border-b pb-5"
                      >
                        {/* COVER */}
                        <img
                          src={e.cover}
                          alt={e.title}
                          className="w-36 h-24 rounded-lg object-cover"
                        />

                        {/* INFO */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 text-lg">
                            {e.title}
                          </h3>
                          <p className="text-sm text-gray-600">{e.organizer}</p>
                          <p className="text-xs text-gray-500 mt-1">{e.date}</p>
                        </div>

                        {/* ACTION */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(e)}
                            className="px-3 py-1 text-sm bg-amber-400 text-white rounded hover:bg-amber-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(e.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ================= IMPACTIN ================= */}
              {tab === "impact" && (
                <p className="text-gray-500 italic">
                  Experience dari Impactin akan ditampilkan di sini (read-only).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              {editingId ? "Edit Experience" : "Add Experience"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul Event"
                className="w-full p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <input
                type="text"
                placeholder="Penyelenggara"
                className="w-full p-2 border rounded"
                value={form.organizer}
                onChange={(e) =>
                  setForm({ ...form, organizer: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Tanggal (e.g. April 2025)"
                className="w-full p-2 border rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
              />

              {form.coverPreview && (
                <img
                  src={form.coverPreview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              >
                {editingId ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProfilePage;
