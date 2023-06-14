import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SidePanel = () => {
  const { users, loggedUser, allPosts } = useContext(Context);
  const navigate = useNavigate();

  const handleNavigateUser = (id) => {
    if (loggedUser.id === id) {
      navigate("/");
    } else {
      navigate(`/user/${id}`);
    }
  };

  const sortedUsers = users.sort((a, b) => b.posts - a.posts).slice(0, 10);

  const uniqueAuthors = {};
  allPosts.forEach((post) => {
    const author = post.author;
    const upvotes = Number(post.upvotes) || 0;

    if (uniqueAuthors[author]) {
      uniqueAuthors[author] += upvotes;
    } else {
      uniqueAuthors[author] = upvotes;
    }
  });

  const uniqueAuthorsArr = Object.keys(uniqueAuthors)
    .map((author) => ({
      author,
      upvotes: uniqueAuthors[author],
    }))
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 10);

  const setArrowStyles = (index) => {
    const upvotes = uniqueAuthorsArr[index].upvotes;
    let color = "black";
    let transform = "rotate(0deg)";
    let display = "inline";

    if (upvotes > 0) {
      color = "green";
      transform = "rotate(0deg)";
    } else if (upvotes < 0) {
      color = "red";
      transform = "rotate(180deg)";
    } else {
      display = "none";
    }

    return {
      fill: color,
      transform: transform,
      display: display,
    };
  };

  return (
    <div className="side-panel">
      <h2>Top Creators:</h2>
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
              <span className="posts-number">
                {user.posts === 1
                  ? `${user.posts} post`
                  : `${user.posts} posts`}
              </span>
            </div>
          ))}
      </div>
      <h2 className="top-users-header">Top Users:</h2>
      <div className="top-users">
        {uniqueAuthorsArr.length &&
          uniqueAuthorsArr.map((user, index) => (
            <div key={index} className="top-user">
              <p>{user.author}</p>
              <span>
                {user.upvotes}
                <svg
                  style={{
                    fill: setArrowStyles(index).fill,
                    transform: setArrowStyles(index).transform,
                    height: "10px",
                    display: setArrowStyles(index).display,
                  }}
                  className="downvote"
                  width="44"
                  height="46"
                  viewBox="0 0 44 46"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 44.5H14.5C13.9477 44.5 13.5 44.0523 13.5 43.5V26C13.5 25.4477 13.0523 25 12.5 25H3.23841C2.37373 25 1.91662 23.9768 2.49358 23.3328L21.7464 1.84128C22.1469 1.39413 22.8484 1.39822 23.2438 1.85002L42.0488 23.3415C42.6146 23.9881 42.1554 25 41.2962 25H32C31.4477 25 31 25.4477 31 26V43.5C31 44.0523 30.5523 44.5 30 44.5Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SidePanel;
