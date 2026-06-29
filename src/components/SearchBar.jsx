import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px"
        }}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;