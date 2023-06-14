import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import createPost from "../../utils/createPost";
import updateUser from "../../utils/updateUser";

import "./styles.css";

import cross from "../../assets/icons/cross.svg";

const CreateTweetModal = ({ setOpenModal }) => {
  const { localStorageUser, posts, loggedUser } = useContext(Context);
  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    text: "",
    createdAt: "",
    upvotes: "",
    id: "",
  });
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");

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
      await updateUser(loggedUser.id, userPostsNumber, "create");
      setOpenModal(false);
      window.location.reload();
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

    if (newPost.title.length > 40 || newPost.text.length > 1200) {
      setAuthStatus(
        "The title must be fewer than 40 characters, and the body must be fewer than 1200 characters.\nRemember, no one cares."
      );
    } else {
      setAuthStatus(null);
    }

    setNewPost((prevPost) => ({
      ...prevPost,
      author: localStorageUser.login,
      [name]: value,
      createdAt: postCreationTime,
    }));
  };

  return (
    <div className="modal-background">
      <div className="create-post">
        <img
          src={cross}
          alt="close-modal"
          className="close-modal"
          onClick={() => setOpenModal(false)}
        />
        <form action="">
          <h4>{authStatus}</h4>
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
export default CreateTweetModal;
