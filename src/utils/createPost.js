import axios from "axios";

const createPost = async (post) => {
  try {
    const response = await axios.post(
      "https://646d10197b42c06c3b2c7fc2.mockapi.io/posts",
      post
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default createPost;
