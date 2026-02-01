import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = value.trim();
    if (!normalized) return;
    onSearch?.(normalized);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        name="query"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          setValue(next);
          onSearch?.(next);
        }}
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
