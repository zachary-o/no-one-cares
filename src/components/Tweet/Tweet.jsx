import { useContext, useState } from "react";
import { Context } from "../../App";

import updatePost from "../../utils/updatePost";
import "./styles.css";

const Tweet = ({ post }) => {
  const { posts, setPosts, loggedUser } = useContext(Context);
  const [voteCount, setVoteCount] = useState(post.upvotes || 0);
  const [showMore, setShowMore] = useState(false);

  const handleUpvote = async (postId) => {
    const hasVoted = post.voters.includes(loggedUser.login);
    if (!hasVoted) {
      try {
        const updatedUpvotes = Number(post.upvotes) + 1;
        const updatedVoters = [...post.voters, loggedUser.login];
        const updatedPost = await updatePost(
          postId,
          updatedUpvotes,
          updatedVoters
        );
        if (updatedPost) {
          const updatedPosts = posts.map((post) =>
            post.id === postId ? updatedPost : post
          );
          setPosts(updatedPosts);
          setVoteCount(updatedUpvotes);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDownvote = async (postId) => {
    const hasVoted = post.voters.includes(loggedUser.login);
    if (!hasVoted) {
      try {
        const updatedUpvotes = Number(post.upvotes) - 1;
        const updatedVoters = [...post.voters, loggedUser.login];
        const updatedPost = await updatePost(
          postId,
          updatedUpvotes,
          updatedVoters
        );
        if (updatedPost) {
          const updatedPosts = posts.map((post) =>
            post.id === postId ? updatedPost : post
          );
          setPosts(updatedPosts);
          setVoteCount(updatedUpvotes);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleText = () => {
    setShowMore(!showMore);
  };

  const votesColor = () => {
    let color = "black";
    if (voteCount > 0) {
      color = "green";
    } else if (voteCount < 0) {
      color = "red";
    } else {
      color = "black";
    }

    return {
      color,
    };
  };

  const shouldShowMoreButton = post.text.length >= 300;
  const displayText = showMore ? post.text : post.text.slice(0, 299);

  return (
    <div className="posts-wrapper">
      <div className="post-wrapper">
        <div className="author-and-date">
          <p>@{post.author}</p>
          <p>{post.createdAt}</p>
        </div>

        <h1 className="post-title">{post.title}</h1>
        <p className={`post-body ${showMore ? "show-more" : ""}`}>
          {displayText}
        </p>
        {shouldShowMoreButton && (
          <button className="show-more-button" onClick={toggleText}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
        <div className="upvotes">
          <svg
            onClick={() => handleUpvote(post.id)}
            className="upvote"
            width="44"
            height="46"
            viewBox="0 0 44 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 44.5H14.5C13.9477 44.5 13.5 44.0523 13.5 43.5V26C13.5 25.4477 13.0523 25 12.5 25H3.23841C2.37373 25 1.91662 23.9768 2.49358 23.3328L21.7464 1.84128C22.1469 1.39413 22.8484 1.39822 23.2438 1.85002L42.0488 23.3415C42.6146 23.9881 42.1554 25 41.2962 25H32C31.4477 25 31 25.4477 31 26V43.5C31 44.0523 30.5523 44.5 30 44.5Z"
              stroke="black"
              strokeWidth="3"
            />
          </svg>
          <p style={{ color: votesColor().color }}>{voteCount}</p>
          <svg
            onClick={() => handleDownvote(post.id)}
            style={{ transform: "rotate(180deg)" }}
            className="downvote"
            width="44"
            height="46"
            viewBox="0 0 44 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 44.5H14.5C13.9477 44.5 13.5 44.0523 13.5 43.5V26C13.5 25.4477 13.0523 25 12.5 25H3.23841C2.37373 25 1.91662 23.9768 2.49358 23.3328L21.7464 1.84128C22.1469 1.39413 22.8484 1.39822 23.2438 1.85002L42.0488 23.3415C42.6146 23.9881 42.1554 25 41.2962 25H32C31.4477 25 31 25.4477 31 26V43.5C31 44.0523 30.5523 44.5 30 44.5Z"
              stroke="black"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Tweet;
