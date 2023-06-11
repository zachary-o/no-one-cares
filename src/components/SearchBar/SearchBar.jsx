import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import "./styles.css";
import search from "../../assets/icons/search.svg";
import cross from "../../assets/icons/cross.svg";

const SearchBar = () => {
  const { allPosts, searchResults, setSearchResults } = useContext(Context);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;

    if (
      inputValue === "" &&
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setSearchInput("");
      setSearchResults([]);
      return;
    }

    setSearchInput(event.target.value);
    const resultsArray = allPosts.filter(
      (post) =>
        post.author.toLowerCase().includes(event.target.value.toLowerCase()) ||
        post.text.toLowerCase().includes(event.target.value.toLowerCase()) ||
        post.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        post.createdAt
          .toLowerCase()
          .slice(0, 11)
          .includes(event.target.value.toLowerCase())
    );

    setSearchResults(resultsArray);
  };

  const handleResetSearch = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  return (
    <div>
      <form className="search" onSubmit={(event) => handleSubmit(event)}>
        <img
          src={search}
          alt="search"
          className="search-button"
          onClick={handleSubmit}
        />
        <input
          className="search-input"
          type="text"
          value={searchInput}
          onChange={(event) => handleSearchChange(event)}
        />
        <img
          src={cross}
          alt=""
          className={searchInput ? "search-clear-active" : "search-clear"}
          onClick={handleResetSearch}
        />
      </form>
    </div>
  );
};
export default SearchBar;
