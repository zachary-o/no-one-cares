import axios from "axios";

const updatePost = async (postId, newUpvotes) => {
  try {
    await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/posts/${postId}`,
      {
        upvotes: newUpvotes,
      }
    );
  } catch (error) {
    console.error(
      error
    );
  }
}

export default updatePost;
