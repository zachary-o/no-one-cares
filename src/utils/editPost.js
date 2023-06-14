import axios from "axios";

const editPost = async (postId, post) => {
  try {
    const response = await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/posts/${postId}`,
      post
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default editPost;
