import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";

import getPosts from "../../utils/getPosts";

import Navbar from "../../components/Navbar/Navbar";
import Tweet from "../../components/Tweet/Tweet";

import "./styles.css";

const UserPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [visible, setVisible] = useState(3);
  const { users } = useContext(Context);
  const { id } = useParams();

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const neededUser = users.find((user) => user.id === id);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setUserPosts(
        posts.reverse().filter((post) => post.author === neededUser.login)
      );
    };

    if (neededUser) {
      fetchPosts();
    }
  }, [neededUser]);

  return (
    <div className="wrapper">
      <Navbar />
      {userPosts.length ? (
        userPosts
          .slice(0, visible)
          .map((post) => <Tweet key={post.id} post={post} />)
      ) : (
        null
      )}
      {userPosts.length > 0 && visible <= userPosts.length ? (
        <button onClick={handleShowMorePosts} className="load-more-button">
          Load more
        </button>
      ) : null}
    </div>
  );
};
export default UserPage;
