import { useState, useEffect, useContext } from "react";
import { Context } from "../../App";
import Navbar from "../Navbar/Navbar";

import createPost from "../../utils/createPost";

import "./styles.css";

const CreatePost = () => {
  const { localStorageUser } = useContext(Context);
  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    text: "",
    createdAt: "",
    upvotes: "",
    id: "",
  });

  const handleSavePost = async (event) => {
    event.preventDefault();
    try {
      const publishNewPost = await createPost(newPost);
      setNewPost({
        author: "",
        title: "",
        text: "",
        createdAt: "",
        upvotes: "",
        id: "",
      });
      console.log("Post saved successfully:", publishNewPost);
    } catch (error) {
      throw error;
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
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

  console.log(newPost);

  return (
    <div className="create-post">
      <Navbar />
      <form action="">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={newPost.title}
          onChange={(event) => handleInputChange(event)}
        />
        <label>
          Text:
          <textarea
            name="text"
            placeholder="Body"
            required
            value={newPost.text}
            onChange={(event) => handleInputChange(event)}
          />
        </label>
        <button type="submit" onClick={(event) => handleSavePost(event)}>
          Save
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
