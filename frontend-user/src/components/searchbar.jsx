import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search Event"
      className="w-72 px-4 py-2 rounded-full border bg-white"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
