import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import avatarImg from "../../assets/photo avatar of user profile.png";
import { getProfileAPI, changePasswordAPI } from "../../api/profile";

const ProfilePage = () => {
  const navigate = useNavigate();

  /* ================= PROFILE FROM API ================= */
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("user_id");
const res = await getProfileAPI(userId);

        setProfile({
          name: res.name,
          username: res.username,
          role: res.status || "User",
          age: res.age ? `${res.age} Tahun` : "-",
          location: res.city || "-",
          bio: res.bio || "Belum ada bio.",
          skills: Array.isArray(res.skills)
            ? res.skills.map((s) => (typeof s === "string" ? s : s.skills))
            : res.skills?.skills || [],

          image: res.image_url || avatarImg,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= TAB ================= */
  const [tab, setTab] = useState("experience");

  /* ================= EXPERIENCE (DUMMY – TETAP) ================= */
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

  /* ================= LOGOUT ================= */
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ================= CHANGE PASSWORD ================= */
  const [showChangePwModal, setShowChangePwModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });

  const handleChangePassword = async () => {
    if (!passwordForm.current || !passwordForm.newPw || !passwordForm.confirm) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (passwordForm.newPw !== passwordForm.confirm) {
      alert("Password baru tidak sama!");
      return;
    }

    try {
      await changePasswordAPI({
        old_password: passwordForm.current,
        new_password: passwordForm.newPw,
      });

      alert("Password berhasil diubah ✅");

      setShowChangePwModal(false);
      setPasswordForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      console.error(err);

      const msg = err.response?.data?.message || "Input minimal 6 characters ";

      alert(msg);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          Loading profile...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* ================= PROFILE HEADER ================= */}
          <div className="bg-gradient-to-r from-green-200 to-green-100 p-10 rounded-xl shadow-md flex items-center gap-8">
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />

            <div>
              <h1 className="text-3xl font-bold text-green-800">
                {profile.name}
              </h1>

              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                {[profile.role, profile.age, profile.location].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="bg-green-700 text-white px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <p className="mt-4 italic text-green-900">{profile.bio}</p>
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
                  {profile.skills.length > 0 ? (
                    profile.skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No skills added</p>
                  )}
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
                          <p className="text-sm text-gray-600">{e.organizer}</p>
                          <p className="text-xs text-gray-500 mt-1">{e.date}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditExperience(e)}
                            className="px-3 py-1 bg-amber-400 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(e.id)}
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
                  Experience dari Impactin akan ditampilkan di sini (read-only).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showChangePwModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>

            <input
              type="password"
              placeholder="Current password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="New password"
              value={passwordForm.newPw}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPw: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowChangePwModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>

            <p className="mb-6 text-gray-600">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      console.log("IMAGE FROM API:", res.image_url);
      <Footer />
    </>
  );
};

export default ProfilePage;
