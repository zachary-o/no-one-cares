import { useState, useContext } from "react";
import { Context } from "../../App";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";
import SidePanel from "../../components/SidePanel/SidePanel";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";

import "./styles.css";

const AllPosts = () => {
  const [visible, setVisible] = useState(3);
  const { allPosts } = useContext(Context);
  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <main>
        <div className="all-posts">
          <h1 className="all-posts-header">
            {allPosts ? "Latest on No One Cares Blog:" : "No posts yet"}
          </h1>
          {allPosts.slice(0, visible).map((post) => (
            <Tweet key={post.id} post={post} />
          ))}
          {allPosts.length > 0 && visible <= allPosts.length ? (
            <button onClick={handleShowMorePosts} className="load-more-button">
              Load more
            </button>
          ) : null}
        </div>
        <SidePanel />
      </main>
      <BackToTopButton />
    </div>
  );
};
export default AllPosts;
