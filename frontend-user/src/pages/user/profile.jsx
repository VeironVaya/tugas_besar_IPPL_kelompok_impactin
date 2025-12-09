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

  // LOCAL EXPERIENCE STATE
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      title: "Yayasan Laut Hijau",
      subtitle: "Aksi Tanam 1000 Mangrove Pesisir Utara",
      date: "April, 2025",
      description:
        "Memimpin tim kecil dalam penanaman dan pemetaan 150 bibit mangrove di kawasan rawan abrasi.",
      logo: MOCK_CARD_IMAGE,
    },
  ]);

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    date: "",
    description: "",
    logo: null,
    logoPreview: null,
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddExperience = () => {
    if (!form.title || !form.subtitle || !form.date || !form.description) {
      alert("Harap isi semua field!");
      return;
    }

    const newExperience = {
      id: Date.now(),
      title: form.title,
      subtitle: form.subtitle,
      date: form.date,
      description: form.description,
      logo: form.logoPreview || MOCK_CARD_IMAGE,
    };

    setExperienceList([...experienceList, newExperience]);

    // Reset & Close
    setForm({
      title: "",
      subtitle: "",
      date: "",
      description: "",
      logo: null,
      logoPreview: null,
    });

    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* TOP SECTION */}
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
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full">
                    {user.role}
                  </span>
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full">
                    {user.age}
                  </span>
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full">
                    {user.location}
                  </span>
                </div>

                <p className="mt-4 text-green-900 italic">{user.bio}</p>
              </div>

              {/* BUTTON EDIT PROFILE */}
              <button
                onClick={() => navigate("/edit_profile")}
                className="ml-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
            {/* LEFT – Skills & Menu */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-white p-6 shadow-md rounded-xl">
                <h2 className="font-bold text-green-800 text-lg mb-3">
                  Skills
                </h2>
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

              {/* Menu */}
              <div className="bg-white p-6 shadow-md rounded-xl space-y-3">
                <button className="block w-full text-left hover:text-green-700">
                  Change Password
                </button>
                <button className="block w-full text-left hover:text-green-700">
                  Log Out
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT */}
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

              {/* Add Experience button ONLY for user experience */}
              {tab === "experience" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mb-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  + Add Experience
                </button>
              )}

              {/* Experience List */}
              <div className="space-y-6">
                {experienceList.map((e) => (
                  <div key={e.id} className="border-b pb-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-white shadow-lg rounded-lg flex items-center justify-center">
                        <img src={e.logo} alt="logo" className="w-14" />
                      </div>

                      <div>
                        <h3 className="font-bold text-green-800 text-lg">
                          {e.title}
                        </h3>
                        <p className="font-semibold text-sm text-gray-600">
                          {e.subtitle}
                        </p>
                        <p className="mt-2 text-gray-700 text-sm">
                          {e.description}
                        </p>
                      </div>

                      <p className="ml-auto text-sm text-gray-500">{e.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ADD EXPERIENCE */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              Add Experience
            </h2>

            {/* FORM */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Penyelenggara Event"
                className="w-full p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <input
                type="text"
                placeholder="Nama Event"
                className="w-full p-2 border rounded"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />

              <input
                type="text"
                placeholder="Waktu (e.g., April, 2025)"
                className="w-full p-2 border rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <textarea
                placeholder="Deskripsi Pengalaman Anda"
                className="w-full p-2 border rounded"
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>

              {/* UPLOAD LOGO */}
              <div>
                <label className="font-semibold">Upload Foto/Logo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-1"
                />

                {form.logoPreview && (
                  <img
                    src={form.logoPreview}
                    alt="preview"
                    className="w-20 h-20 rounded-lg mt-2 object-cover"
                  />
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExperience}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Add
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
