import axios from "axios";

const updatePost = async (postId, upvotes, voters) => {
  try {
    const response = await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/posts/${postId}`,
      {
        upvotes,
        voters,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default updatePost;
