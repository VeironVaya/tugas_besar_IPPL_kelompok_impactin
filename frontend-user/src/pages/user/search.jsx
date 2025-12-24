import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import { getEventsAPI } from "../../api/event";

export default function SearchEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= QUERY SEARCH ================= */
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";

  /* ================= STATE ================= */
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAges, setSelectedAges] = useState([]);

  /* ================= AGE OPTIONS ================= */
  const AGE_OPTIONS = [
    { label: "<16", send: "<16" },
    { label: "16–20 Tahun", send: "16-20" },
    { label: "21–30 Tahun", send: "21-30" },
    { label: "31–40 Tahun", send: "31-40" },
    { label: "41–45 Tahun", send: "41-45" },
    { label: ">45", send: ">45" },
  ];

  /* ================= TOGGLE AGE (CHECKBOX) ================= */
  const toggleAge = (ageObj) => {
    setSelectedAges((prev) =>
      prev.find((a) => a.label === ageObj.label)
        ? prev.filter((a) => a.label !== ageObj.label)
        : [...prev, ageObj]
    );
  };

  /* ================= FETCH SEARCH (INPUT SEARCH) ================= */
  useEffect(() => {
    if (!keyword) {
      setEvents([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await getEventsAPI({ search: keyword });
        setEvents(res.data || []);
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [keyword]);

  /* ================= APPLY FILTER ================= */
  const applyFilter = async () => {
    setLoading(true);
    try {
      const params = {};

      if (keyword) params.search = keyword;
      if (selectedCategory) params.category = selectedCategory;

      // backend cuma bisa 1 age → ambil satu representatif
      if (selectedAges.length > 0) {
        params.age = selectedAges[0].send;
      }

      const res = await getEventsAPI(params);
      setEvents(res.data || []);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="px-6 py-8 bg-green-50 min-h-screen">
        {!keyword && (
          <div className="text-center text-gray-500">
            Ketik sesuatu untuk mencari event...
          </div>
        )}

        {keyword && (
          <div className="grid grid-cols-12 gap-6">
            {/* ================= FILTER ================= */}
            <div className="col-span-3 bg-white shadow rounded-xl p-5 space-y-6">
              <h3 className="font-bold text-lg">Filter</h3>

              {/* CATEGORY */}
              <div>
                <h4 className="font-semibold mb-3">Event Category</h4>
                <div className="space-y-2 text-sm">
                  {/* ALL CATEGORY */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="accent-green-600"
                    />
                    <span>All Category</span>
                  </label>

                  {/* SPECIFIC CATEGORY */}
                  {["Environment", "Education", "Community", "Health"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-green-600"
                        />
                        <span>{cat}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* AGE */}
              <div>
                <h4 className="font-semibold mb-3">Age Range</h4>
                <div className="space-y-2 text-sm">
                  {AGE_OPTIONS.map((age) => (
                    <label
                      key={age.label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAges.some(
                          (a) => a.label === age.label
                        )}
                        onChange={() => toggleAge(age)}
                        className="accent-green-600"
                      />
                      <span>{age.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={applyFilter}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition"
              >
                Apply Filter
              </button>
            </div>

            {/* ================= EVENT LIST ================= */}
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {loading && (
                <div className="col-span-3 text-center text-gray-500">
                  Loading events...
                </div>
              )}

              {!loading && events.length === 0 && (
                <div className="col-span-3 text-center text-gray-500">
                  Event tidak ditemukan
                </div>
              )}

              {events.map((event) => (
                <div
                  key={event.event_id}
                  onClick={() => navigate(`/event/${event.event_id}`)}
                  className="bg-white rounded-xl shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
                >
                  <img
                    src={event.cover_image}
                    className="w-full h-40 object-cover"
                    alt={event.title}
                  />

                  <div className="p-4">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {event.host_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
