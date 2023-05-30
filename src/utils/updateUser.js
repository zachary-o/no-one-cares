import axios from "axios";

const updatePost = async (userId, oldPostsCount) => {
  try {
    await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`,
      {
        posts: oldPostsCount + 1,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default updatePost;
