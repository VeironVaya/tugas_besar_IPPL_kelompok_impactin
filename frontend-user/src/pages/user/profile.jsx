import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import avatarImg from "../../assets/photo avatar of user profile.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  /* ================= USER ================= */
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

  /* ================= TAB ================= */
  const [tab, setTab] = useState("experience");

  /* ================= EXPERIENCE ================= */
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      title: "Aksi Tanam 1000 Mangrove",
      organizer: "Yayasan Laut Hijau",
      date: "April 2025",
      cover: MOCK_CARD_IMAGE,
    },
  ]);

  /* ================= EXPERIENCE MODAL ================= */
  const [showExpModal, setShowExpModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [expForm, setExpForm] = useState({
    title: "",
    organizer: "",
    date: "",
    cover: null,
    coverPreview: null,
  });

  const resetExpForm = () => {
    setExpForm({
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

    setExpForm({
      ...expForm,
      cover: file,
      coverPreview: URL.createObjectURL(file),
    });
  };

  const handleSaveExperience = () => {
    if (!expForm.title || !expForm.organizer || !expForm.date) {
      alert("Judul, penyelenggara, dan tanggal wajib diisi!");
      return;
    }

    if (editingId) {
      setExperienceList((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title: expForm.title,
                organizer: expForm.organizer,
                date: expForm.date,
                cover: expForm.coverPreview || e.cover,
              }
            : e
        )
      );
    } else {
      setExperienceList((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: expForm.title,
          organizer: expForm.organizer,
          date: expForm.date,
          cover: expForm.coverPreview || MOCK_CARD_IMAGE,
        },
      ]);
    }

    resetExpForm();
    setShowExpModal(false);
  };

  const handleEditExperience = (exp) => {
    setEditingId(exp.id);
    setExpForm({
      title: exp.title,
      organizer: exp.organizer,
      date: exp.date,
      cover: null,
      coverPreview: exp.cover,
    });
    setShowExpModal(true);
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm("Yakin ingin menghapus experience ini?")) {
      setExperienceList((prev) => prev.filter((e) => e.id !== id));
    }
  };

  /* ================= LOGOUT MODAL ================= */
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // optional
    navigate("/login");
  };

  /* ================= CHANGE PASSWORD MODAL ================= */
  const [showChangePwModal, setShowChangePwModal] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });

  const handleChangePassword = () => {
    if (
      !passwordForm.current ||
      !passwordForm.newPw ||
      !passwordForm.confirm
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (passwordForm.newPw !== passwordForm.confirm) {
      alert("Password baru tidak sama!");
      return;
    }

    alert("Password berhasil diubah (dummy)");
    setShowChangePwModal(false);
    setPasswordForm({ current: "", newPw: "", confirm: "" });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* ================= PROFILE HEADER ================= */}
          <div className="bg-gradient-to-r from-green-200 to-green-100 p-10 rounded-xl shadow-md flex items-center gap-8">
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

              <p className="mt-4 italic text-green-900">{user.bio}</p>
            </div>

            <button
              onClick={() => navigate("/edit_profile")}
              className="ml-auto px-4 py-2 bg-green-700 text-white rounded-lg"
            >
              Edit Profile
            </button>
          </div>

          {/* ================= MAIN ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
            {/* LEFT */}
            <div className="bg-white p-6 rounded-xl shadow space-y-6">
              <div>
                <h2 className="font-bold text-green-800 mb-3">Skills</h2>
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

              <hr />

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowChangePwModal(true)}
                  className="text-left px-4 py-2 rounded-lg text-green-700 hover:bg-green-50"
                >
                  Change Password
                </button>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow">
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

              {tab === "experience" && (
                <>
                  <button
                    onClick={() => {
                      resetExpForm();
                      setShowExpModal(true);
                    }}
                    className="mb-6 px-4 py-2 bg-green-700 text-white rounded-lg"
                  >
                    + Add Experience
                  </button>

                  <div className="space-y-6">
                    {experienceList.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-5 border-b pb-5"
                      >
                        <img
                          src={e.cover}
                          alt={e.title}
                          className="w-36 h-24 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 text-lg">
                            {e.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {e.organizer}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {e.date}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditExperience(e)}
                            className="px-3 py-1 bg-amber-400 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteExperience(e.id)
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab === "impact" && (
                <p className="italic text-gray-500">
                  Experience dari Impactin akan ditampilkan di sini
                  (read-only).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPERIENCE MODAL ================= */}
      {showExpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              {editingId ? "Edit Experience" : "Add Experience"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul Event"
                className="w-full p-2 border rounded"
                value={expForm.title}
                onChange={(e) =>
                  setExpForm({ ...expForm, title: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Penyelenggara"
                className="w-full p-2 border rounded"
                value={expForm.organizer}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    organizer: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Tanggal (e.g. April 2025)"
                className="w-full p-2 border rounded"
                value={expForm.date}
                onChange={(e) =>
                  setExpForm({ ...expForm, date: e.target.value })
                }
              />

              <input type="file" onChange={handleCoverUpload} />

              {expForm.coverPreview && (
                <img
                  src={expForm.coverPreview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowExpModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-green-700 text-white rounded"
              >
                {editingId ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center w-full max-w-md">
            <h2 className="font-bold text-lg mb-6">
              Are you sure to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 bg-gray-200 rounded"
              >
                NO
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-green-700 text-white rounded"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {showChangePwModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold text-center mb-8 text-green-800 ">
              Change your password
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border rounded"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    current: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded"
                value={passwordForm.newPw}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPw: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowChangePwModal(false)}
                className="px-6 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-6 py-2 bg-green-700 text-white rounded"
              >
                Change Password
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
