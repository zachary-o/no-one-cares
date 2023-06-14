import { useState } from "react";

import editPost from "../../utils/editPost";

import "./styles.css";

import cross from "../../assets/icons/cross.svg";

const EditTweetModal = ({ setEditPost, post }) => {
  const [editOldPost, setEditOldPost] = useState({
    author: post.author,
    title: post.title,
    text: post.text,
    createdAt: "",
    upvotes: post.upvotes,
    id: post.id,
  });

  const [authStatus, setAuthStatus] = useState("");

  const handleEditPost = async (event) => {
    event.preventDefault();

    try {
      await editPost(editOldPost.id, editOldPost);
      setEditPost(false);
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

    if (editOldPost.title.length > 40 || editOldPost.text.length > 1200) {
      setAuthStatus(
        "The title must be fewer than 40 characters, and the body must be fewer than 1200 characters.\nRemember, no one cares."
      );
    } else {
      setAuthStatus(null);
    }

    setEditOldPost((prevPost) => ({
      ...prevPost,
      [name]: value,
      createdAt: postCreationTime,
    }));
  };
console.log(editOldPost.title, editOldPost.text)
  return (
    <div className="modal-background">
      <div className="edit-post-container">
        <img
          src={cross}
          alt="close-modal"
          className="close-modal"
          onClick={() => setEditPost(false)}
        />
        <form action="">
          <h4>{authStatus}</h4>
          <label htmlFor="title">Title</label>
          <input
            className="title-input"
            type="text"
            name="title"
            required
            value={editOldPost.title}
            onChange={(event) => handleInputChange(event)}
          />
          <label htmlFor="text">Text</label>
          <textarea
            className="textarea"
            name="text"
            required
            value={editOldPost.text}
            onChange={(event) => handleInputChange(event)}
          />
          <button
            className="save-post-button"
            type="submit"
            onClick={(event) => handleEditPost(event)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditTweetModal;
