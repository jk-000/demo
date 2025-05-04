import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim()) {
        navigate(`/search?query=${searchTerm.trim()}`);
      }
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
