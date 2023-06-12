import axios from "axios";

const deleteUser = async (userId) => {
  try {
    await axios.delete(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`
    );
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
