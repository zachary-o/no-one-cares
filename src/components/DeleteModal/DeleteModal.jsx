import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

import deleteUser from "../../utils/deleteUser";
import updateUser from "../../utils/updateUser";
import deletePost from "../../utils/deletePost"
import deletePostsByAuthor from "../../utils/deletePostsByAuthor";

import "./styles.css";

import cross from "../../assets/icons/cross.svg";

const DeleteModal = ({ setOpenModal, post, title }) => {
  const { loggedUser, setLoggedUser, posts, localStorageUser } =
    useContext(Context);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (title === "profile") {
      await deleteUser(loggedUser.id);
      await deletePostsByAuthor(loggedUser.login);
      localStorage.removeItem("user");
      setLoggedUser(null);
      navigate("/login");
    } else if (title === "post") {
      await deletePost(post.id);
      const userPostsNumber = posts.filter(
        (post) => post.author === localStorageUser.login
      ).length;
      await updateUser(loggedUser.id, userPostsNumber, "delete");
      setOpenModal(false);
      window.location.reload();
    }
    return;
  };

  console.log(loggedUser)

  return (
    <div className="modal-background">
      <div className="modal-container">
        <img
          src={cross}
          alt="close-modal"
          onClick={() => setOpenModal(false)}
          className="close-modal"
        />
        <div className="modal-title">
          <h3>Are you sure you want to delete {title}?</h3>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button-cancel"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button className="modal-button-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
