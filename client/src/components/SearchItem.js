import React, { useState } from "react";
import classes from "./SearchItem.module.css";

const SearchItem = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [records] = useState(JSON.parse(localStorage.getItem("records")));
  const handleSearchText = (e) => {
    let text = e.target.value;
    setSearchText(text);
    const filteredItems = records.filter((record) => {
      return record.domain.toLowerCase().includes(text.toLowerCase());
    });
    onSearch(filteredItems);
  };
  return (
    <input
      value={searchText}
      onChange={handleSearchText}
      type="text"
      placeholder="Search for domains..."
    />
  );
};

export default SearchItem;
