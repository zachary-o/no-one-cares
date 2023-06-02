import axios from "axios";

const resetPosts = async (userId) => {
  try {
    await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`,
      {
        posts: 0,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default resetPosts;
