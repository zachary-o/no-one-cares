import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import CreateTweetModal from "../../components/CreateTweetModal/CreateTweetModal";

import "./styles.css";

const HomePage = () => {
  const [visible, setVisible] = useState(3);
  const [openModal, setOpenModal] = useState(false);

  const { posts } = useContext(Context);
  const navigate = useNavigate();

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <button onClick={() => setOpenModal(true)} className="create-post-button">
        Create new post
      </button>
      {posts.length ? (
        posts
          .slice(0, visible)
          .map((post) => <Tweet key={post.id} post={post} />)
      ) : (
        <h1>No posts yet...</h1>
      )}
      {posts.length > 0 && visible <= posts.length ? (
        <button onClick={handleShowMorePosts} className="load-more-button">
          Load more
        </button>
      ) : null}
      <BackToTopButton />
      {openModal && <CreateTweetModal setOpenModal={setOpenModal} />}
    </div>
  );
};
export default HomePage;
