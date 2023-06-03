import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import getUsers from "../../utils/getUsers";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";

import "./styles.css";

const HomePage = () => {
  const [visible, setVisible] = useState(3);
  const { posts, setUsers } = useContext(Context);
  const navigate = useNavigate();

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

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
      {posts.length ? posts.slice(0, visible).map((post) => (
        <Tweet key={post.id} post={post} />
      )) : <h1>No posts yet...</h1>}
      {posts.length > 0 && visible <= posts.length ? (
        <button onClick={handleShowMorePosts} className="load-more-button">
          Load more
        </button>
      ) : null}
    </div>
  );
};
export default HomePage;
