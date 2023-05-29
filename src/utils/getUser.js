import axios from "axios";

const getUser = async (userId) => {
  try {
    await axios.get(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`
    );
  } catch (error) {
    throw error
  }
};

export default getUser