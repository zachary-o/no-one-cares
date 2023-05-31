import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import Navbar from "../Navbar/Navbar";

import createPost from "../../utils/createPost";
import updateUser from "../../utils/updateUser";

import "./styles.css";

const CreatePost = () => {
  const { localStorageUser, posts, users, loggedUser } = useContext(Context);
  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    text: "",
    createdAt: "",
    upvotes: "",
    id: "",
  });
  const navigate = useNavigate();


  const handleSavePost = async (event) => {
    event.preventDefault();
    try {
      await createPost(newPost);
      setNewPost({
        author: "",
        title: "",
        text: "",
        createdAt: "",
        upvotes: "",
        id: "",
      });

      const userPostsNumber = posts.filter(
        (post) => post.author === localStorageUser.login
      ).length;
      await updateUser(loggedUser.id, userPostsNumber);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };


  const handleInputChange = (event) => {
    const postCreationTime = new Date().toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const { name, value } = event.target;

    setNewPost((prevPost) => ({
      ...prevPost,
      author: localStorageUser.login,
      [name]: value,
      createdAt: postCreationTime,
    }));
  };

  return (
    <div className="wrapper">
      <Navbar />
      <div className="create-post">
        <form action="">
          <label htmlFor="title">Title</label>
          <input
            className="title-input"
            type="text"
            name="title"
            placeholder="Title"
            required
            value={newPost.title}
            onChange={(event) => handleInputChange(event)}
          />
          <label htmlFor="text">Text</label>
          <textarea
            className="textarea"
            name="text"
            placeholder="Body"
            required
            value={newPost.text}
            onChange={(event) => handleInputChange(event)}
          />
          <button
            className="save-post-button"
            type="submit"
            onClick={(event) => handleSavePost(event)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePost;
