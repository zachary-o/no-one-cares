import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import "./styles.css";
import search from "../../assets/icons/search.svg";
import cross from "../../assets/icons/cross.svg";

const SearchBar = () => {
  const { allPosts, searchResults, setSearchResults } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  const handleSearchChange = (event) => {
    if (!event.target.value) {
      return setSearchResults(allPosts);
    }

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
    setSearchResults("");
  };

  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <img
          src={search}
          alt="search"
          className="search-button"
          onClick={handleSubmit}
        />
        <input
          className="search-input"
          type="text"
          onChange={handleSearchChange}
        />
        <img
          src={cross}
          alt=""
          className={
            searchResults.length > 0 ? "search-clear-active" : "search-clear"
          }
          onClick={handleResetSearch}
        />
      </form>
    </div>
  );
};
export default SearchBar;
