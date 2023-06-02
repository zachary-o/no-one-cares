import { useContext } from "react";
import { Context } from "../../App";

import "./styles.css";

const SidePanel = () => {
  const { users } = useContext(Context);

  const sortedUsers = users.sort((a, b) => b.posts - a.posts);
  console.log(sortedUsers);

  return (
    <div className="side-panel">
      <h2>Top Users:</h2>
      <div className="top-users">
        {sortedUsers.length &&
          sortedUsers.map((user) => (
            <div key={user.id} className="top-user">
              <p>{user.login}</p>
              <span>{user.posts}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SidePanel;
