import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";
import SidePanel from "../../components/SidePanel/SidePanel";

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
        <SidePanel allPosts={allPosts} />
      </main>
    </div>
  );
};
export default AllPosts;
