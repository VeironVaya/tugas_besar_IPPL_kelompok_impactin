import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar";
import avatarImg from "../../assets/photo avatar of user profile.png";

const EditProfile = () => {
  const navigate = useNavigate();

  // Dummy user (nanti tinggal ganti dengan data dari backend / context)
  const [formData, setFormData] = useState({
    name: "Nabila Azhari",
    age: "20 Tahun",
    location: "Bandung, Indonesia",
    bio: "Saya adalah pecinta alam garis keras...",
    skills: ["UI Design", "Communication", "Photography"],
    avatar: avatarImg,
  });

  const [newSkill, setNewSkill] = useState("");

  /** ===============================
   * HANDLE IMAGE UPLOAD + AUTO RESIZE
   * =============================== */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const MAX_SIZE = 300; // fix size 300px
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // SET FIX SQUARE
        canvas.width = MAX_SIZE;
        canvas.height = MAX_SIZE;

        // cover crop: agar tidak gepeng
        const scale = Math.max(MAX_SIZE / img.width, MAX_SIZE / img.height);

        const x = MAX_SIZE / 2 - (img.width / 2) * scale;
        const y = MAX_SIZE / 2 - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);

        setFormData({
          ...formData,
          avatar: resizedDataUrl,
        });
      };
    };

    reader.readAsDataURL(file);
  };

  /** HANDLE SAVE */
  const handleSave = () => {
    console.log("Saved profile:", formData);

    // nanti tinggal panggil API update profile
    // await axios.put("/profile/update", formData)

    navigate("/profile");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-green-50 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-green-800 mb-6">
            Edit Profile
          </h1>

          {/* PROFILE PHOTO */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src={formData.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border border-green-300 shadow"
            />

            <div>
              <label className="block text-sm font-semibold mb-2">
                Change Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm"
              />

              <p className="text-xs text-gray-500 mt-1"></p>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-5">
            {/* NAME */}
            <div>
              <label className="font-semibold text-sm">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>

            {/* AGE */}
            <div>
              <label className="font-semibold text-sm">Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="font-semibold text-sm">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="font-semibold text-sm">Status</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded-lg mt-1"
              />
            </div>

            {/* BIO */}
            <div>
              <label className="font-semibold text-sm">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full p-2 border rounded-lg mt-1 h-28"
              />
            </div>

            {/* SKILLS */}
            <div>
              <label className="font-semibold text-sm">Skills</label>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {s}
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          skills: formData.skills.filter((_, idx) => idx !== i),
                        })
                      }
                      className="text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="p-2 border rounded-lg flex-1"
                />
                <button
                  onClick={() => {
                    if (newSkill.trim() !== "") {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, newSkill],
                      });
                      setNewSkill("");
                    }
                  }}
                  className="px-4 py-2 bg-green-700 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSave}
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
