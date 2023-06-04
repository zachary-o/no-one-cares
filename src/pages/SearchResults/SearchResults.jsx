import { useContext, useState } from "react";
import { Context } from "../../App";

import "./styles.css";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";

const SearchResults = () => {
  const { searchResults } = useContext(Context);
  const [visible, setVisible] = useState(3);

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <div className="wrapper">
      <Navbar />
      {searchResults?.length ? (
        searchResults
          .slice(0, visible)
          .map((post) => <Tweet key={post.id} post={post} />)
      ) : (
        <h1>No Matching Posts</h1>
      )}
      {searchResults.length > 0 && visible <= searchResults.length ? (
        <button onClick={handleShowMorePosts} className="load-more-button">
          Load more
        </button>
      ) : null}
      <BackToTopButton />
    </div>
  );
};
export default SearchResults;
