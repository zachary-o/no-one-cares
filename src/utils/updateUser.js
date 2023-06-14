import axios from "axios";

const updateUser = async (userId, oldPostsCount, action) => {
  if (action === "create") {
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
  } else if (action === "delete") {
    try {
      await axios.put(
        `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`,
        {
          posts: oldPostsCount - 1,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
};

export default updateUser;
