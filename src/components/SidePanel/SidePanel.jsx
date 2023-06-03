import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SidePanel = () => {
  const { users, loggedUser } = useContext(Context);
  const navigate = useNavigate();

  const sortedUsers = users.sort((a, b) => b.posts - a.posts);

  const handleNavigateUser = (id) => {
    if (loggedUser.id === id) {
      navigate("/");
    } else {
      navigate(`/user/${id}`);
    }
  };

  return (
    <div className="side-panel">
      <h2>Top Users:</h2>
      <div className="top-users">
        {sortedUsers.length &&
          sortedUsers.map((user) => (
            <div key={user.id} className="top-user">
              <p
                onClick={() => handleNavigateUser(user.id)}
                className="top-user-link"
              >
                {user.login}
              </p>
              <span>{user.posts}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SidePanel;
