import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";

import Navbar from "../Navbar/Navbar";

import getPosts from "../../utils/getPosts";

import "./styles.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      const usersPosts = posts.filter(
        (user) => user.author === localStorageUser.login
      );
      setPosts(usersPosts);
    };
    fetchPosts();
  }, []);
    const { localStorageUser } = useContext(Context);


  console.log(localStorageUser, "user's posts:", posts);

  return (
    <div className="home-page">
      <Navbar />
      <div className="posts-wrapper">
        <Link to="/create-post">Create new post</Link>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>{post.createdAt}</p>
            <p>{post.upvotes}</p>
            <p>{post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
