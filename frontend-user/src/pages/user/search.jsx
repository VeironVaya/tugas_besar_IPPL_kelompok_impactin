import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";

export default function SearchEvent() {
  const location = useLocation();

  // ambil query dari URL (?q=...)
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const [keyword, setKeyword] = useState(initialQuery);

  // sync jika URL berubah (penting!)
  useEffect(() => {
    setKeyword(initialQuery);
  }, [initialQuery]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAges, setSelectedAges] = useState([]);

  const toggleAge = (age) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const applyFilter = () => {
    console.log("FILTER AKTIF:");
    console.log("Category:", selectedCategory);
    console.log("Ages:", selectedAges);

    // nanti di sini:
    // - filter data frontend
    // - atau fetch API pakai parameter filter
  };

  return (
    <>
      <Header />

      <div className="px-6 py-8 bg-green-50 min-h-screen">
        {/* EMPTY STATE */}
        {!keyword && (
          <div className="text-center text-gray-500">
            Ketik sesuatu untuk mencari event...
          </div>
        )}

        {/* SEARCH RESULT */}
        {keyword && (
          <div className="grid grid-cols-12 gap-6">
            {/* FILTER */}
            <div className="col-span-3 bg-white shadow rounded-xl p-5 space-y-6">
              <h3 className="font-bold text-lg">Filter</h3>

              {/* EVENT CATEGORY (RADIO) */}
              <div>
                <h4 className="font-semibold mb-3">Event Category</h4>
                <div className="space-y-2 text-sm">
                  {["Environment", "Education", "Community", "Health"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="eventCategory"
                          value={cat}
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

              {/* AGE RANGE (CHECKBOX) */}
              <div>
                <h4 className="font-semibold mb-3">Age Range</h4>
                <div className="space-y-2 text-sm">
                  {[
                    "<16",
                    "16–20 Tahun",
                    "21–30 Tahun",
                    "31–40 Tahun",
                    "41–45 Tahun",
                    ">45",
                  ].map((age) => (
                    <label
                      key={age}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAges.includes(age)}
                        onChange={() => toggleAge(age)}
                        className="accent-green-600"
                      />
                      <span>{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* APPLY BUTTON */}
              <button
                onClick={applyFilter}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition"
              >
                Apply Filter
              </button>
            </div>

            {/* EVENT CARDS */}
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <img
                    src="https://picsum.photos/400/250"
                    className="w-full h-40 object-cover"
                    alt="event"
                  />

                  <div className="p-4">
                    <h3 className="font-bold">DeepBlue Movement</h3>
                    <p className="text-sm text-gray-600">
                      The Legend of Blue Sea, Yogyakarta
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Sea Care Indonesia
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
