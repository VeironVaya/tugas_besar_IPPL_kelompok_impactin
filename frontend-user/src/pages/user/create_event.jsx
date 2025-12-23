import { useState } from "react";
import Header from "../../components/navbar";
import Footer from "../../components/footer.jsx";
import { createEventAPI } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../../api/cloudinary";



export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    address: "",
    addressLink: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxParticipant: "",
    coverImage: null,
    description: "",
    terms: "",
    minAge: "",
    maxAge: "",
    groupLink: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = "https://example.com/default.jpg";

    if (formData.coverImage) {
      imageUrl = await uploadImageToCloudinary(formData.coverImage);
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      specific_address: formData.address,
      address_link: formData.addressLink,
      start_date: formData.startDate,
      end_date: formData.endDate,
      start_time: formData.startTime,
      end_time: formData.endTime,
      max_participant: Number(formData.maxParticipant),
      cover_image: imageUrl, // 🔥 URL dari Cloudinary
      description: formData.description,
      terms: formData.terms,
      min_age: Number(formData.minAge),
      max_age: Number(formData.maxAge),
      group_link: formData.groupLink,
    };

    await createEventAPI(payload);

    alert("Event created successfully 🎉");
    navigate("/your-event");
  } catch (err) {
    console.error(err);
    alert("Failed to create event");
  }
};



  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <h1 className="text-4xl font-bold text-green-800 mb-1">
            Create your ImpactIn Event
          </h1>
          <p className="text-gray-700 mb-8">Start an event. Spark a movement</p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* BASIC INFO */}
            <section className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">Basic Info</h2>
              <p className="text-gray-500 text-sm mb-5">
                Let’s complete your event details, the more complete they are,
                the easier it will be for participants to understand and feel
                interested in joining your event.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="font-medium text-sm">Event Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    placeholder="Create event title"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-sm">Event Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Community">Community</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
              </div>
            </section>

            {/* EVENT LOCATION */}
            <section className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">Event Location</h2>
              <p className="text-gray-500 text-sm mb-5">
                Inform participants about the location details.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter a Location (City, Country)"
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Specific Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter a specific address"
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Address Link*</label>
                  <input
                    type="text"
                    name="addressLink"
                    value={formData.addressLink}
                    onChange={handleChange}
                    placeholder="Enter address URL"
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>
              </div>
            </section>

            {/* EVENT DATE */}
            <section className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">Event Date</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="text-sm font-medium">
                    Event Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Event End Date*</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Event Start Time*
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Event End Time*</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>
              </div>
            </section>

            {/* EVENT DETAIL */}
            <section className="bg-white p-8 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">Event Detail</h2>

              <div className="space-y-5 mt-4">
                <div>
                  <label className="text-sm font-medium">
        
                    Maximum Participant*
                  </label>
                  <input
                    type="number"
                    name="maxParticipant"
                    value={formData.maxParticipant}
                    onChange={handleChange}
                    min={1}
                    placeholder="Set Maximum Participant"
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Event Cover*</label>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Event Description*
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event"
                    className="w-full p-3 border rounded-lg mt-1 h-32"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Terms & Conditions
                  </label>
                  <textarea
                    name="terms"
                    value={formData.terms}
                    onChange={handleChange}
                    placeholder="Add any important rules or participation requirements for your event"
                    className="w-full p-3 border rounded-lg mt-1 h-28"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Minimum Age*</label>
                    <input
                      type="number"
                      name="minAge"
                      min={1}
                      value={formData.minAge}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Maximum Age*</label>
                    <input
                      type="number"
                      name="maxAge"
                      min={1}
                      value={formData.maxAge}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Group Link</label>
                  <input
                    type="text"
                    name="groupLink"
                    value={formData.groupLink}
                    onChange={handleChange}
                    placeholder="Enter group URL if needed"
                    className="w-full p-3 border rounded-lg mt-1"
                    required
                  />
                </div>
              </div>
            </section>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-green-800 text-white rounded-lg hover:bg-green-900"
            >
              DONE
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
