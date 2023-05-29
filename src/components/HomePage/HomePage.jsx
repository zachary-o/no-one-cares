import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import Navbar from "../Navbar/Navbar";

import getPosts from "../../utils/getPosts";
import updatePost from "../../utils/updatePost";

import "./styles.css";
import Tweet from "../Tweet/Tweet";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(3);
  const { localStorageUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      const usersPosts = posts
        .filter((user) => user.author === localStorageUser.login)
        .reverse();
      setPosts(usersPosts);
    };
    fetchPosts();
  }, [localStorageUser]);

  const handleUpvote = async (postId) => {
    const hasVoted = localStorage.getItem(`voted${postId}`);
    if (!hasVoted) {
      const updatedPosts = [...posts];
      const postIndex = updatedPosts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        updatedPosts[postIndex].upvotes = updatedPosts[postIndex].upvotes + 1;
        setPosts(updatedPosts);
        await updatePost(postId, updatedPosts[postIndex].upvotes);
        localStorage.setItem(`voted${postId}`, true);
      }
    }
  };

  const handleDownvote = async (postId) => {
    const hasVoted = localStorage.getItem(`voted${postId}`);
    if (!hasVoted) {
      const updatedPosts = [...posts];
      const postIndex = updatedPosts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        updatedPosts[postIndex].upvotes = updatedPosts[postIndex].upvotes - 1;
        setPosts(updatedPosts);
        await updatePost(postId, updatedPosts[postIndex].upvotes);
        localStorage.setItem(`voted${postId}`, true);
      }
    }
  };

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
    console.log("number of posts:", visible);
  };

  console.log(posts);

  return (
    <div className="wrapper">
      <Navbar />
      <button
        onClick={() => {
          navigate("/create-post");
        }}
        className="create-post-button"
      >
        Create new post
      </button>
      {posts.slice(0, visible).map((post) => (
        <Tweet
          key={post.id}
          post={post}
          
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          
        />
      ))}
      {posts.length > 0 && visible <= posts.length ? (
        <button onClick={handleShowMorePosts} className="load-more-button">
          Load more
        </button>
      ) : null}
    </div>
  );
};
export default HomePage;
