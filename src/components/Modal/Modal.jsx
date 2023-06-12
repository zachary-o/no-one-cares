import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../utils/deleteUser";

import "./styles.css";

import cross from "../../assets/icons/cross.svg";

const Modal = ({ setOpenModal }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const navigate = useNavigate();

  const handleDeleteuser = async () => {
    await deleteUser(loggedUser.id);
    localStorage.removeItem("user");
    setLoggedUser(null);
    navigate("/login");
  };

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
          <h3>Are you sure you want to delete profile?</h3>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button-cancel"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button className="modal-button-delete" onClick={handleDeleteuser}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
