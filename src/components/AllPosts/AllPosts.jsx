import { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Tweet from "../Tweet/Tweet";

import getPosts from "../../utils/getPosts";

import "./styles.css";

const AllPosts = () => {
  const [visible, setVisible] = useState(3);
  const [allPosts, setAllPosts] = useState([]);

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setAllPosts(posts.reverse());
    };
    fetchPosts();
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <div className="all-posts">
        <h1 className="all-posts-header">Latest on No One Cares Blog:</h1>
        {allPosts.slice(0, visible).map((post) => (
          <Tweet key={post.id} post={post} />
        ))}
        {allPosts.length > 0 && visible <= allPosts.length ? (
          <button onClick={handleShowMorePosts} className="load-more-button">
            Load more
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default AllPosts;
