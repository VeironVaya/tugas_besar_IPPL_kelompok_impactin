import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar";
import avatarImg from "../../assets/photo avatar of user profile.png";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Nabila Azhari",
    age: "20 Tahun",
    location: "Bandung, Indonesia",
    status: "Student",
    bio: "Saya adalah pecinta alam garis keras...",
    skills: ["UI Design", "Communication", "Photography"],
    avatar: avatarImg,
  });

  const [newSkill, setNewSkill] = useState("");

  /* ===== HANDLE IMAGE UPLOAD (NO FILE CHOSEN) ===== */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({
        ...formData,
        avatar: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 px-6 py-10">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
          {/* ===== TITLE ===== */}
          <h1 className="text-3xl font-bold text-green-800">
            Edit Profile
          </h1>

          {/* ===== BACK ===== */}
          <button
            onClick={() => navigate("/profile")}
            className="mt-2 text-sm text-green-700 hover:text-green-900"
          >
            ← Back to Profile
          </button>

          <hr className="my-6" />

          {/* ===== PHOTO SECTION ===== */}
          <div className="flex flex-col items-center mb-10">
            {/* AVATAR */}
            <img
              src={formData.avatar}
              alt="avatar"
              className="w-56 h-56 rounded-full object-cover border-4 border-green-600 shadow-lg mb-4"
            />

            {/* CHANGE PHOTO BUTTON */}
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 transition"
            >
              Change Photo
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* ===== FORM ===== */}
          <div className="space-y-5">
            <div>
              <label className="font-semibold">Nama</label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Umur</label>
              <input
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Lokasi</label>
              <input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Status</label>
              <input
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-2 border rounded mt-1 h-28"
              />
            </div>

            {/* ===== SKILLS ===== */}
            <div>
              <label className="font-semibold">Skills</label>

              {/* LIST SKILLS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          skills: formData.skills.filter(
                            (_, idx) => idx !== i
                          ),
                        })
                      }
                      className="text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* ADD SKILL */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    if (newSkill.trim()) {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, newSkill],
                      });
                      setNewSkill("");
                    }
                  }}
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* ===== SAVE ===== */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
