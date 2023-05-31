import axios from "axios";

const editUser = async (userId, newProfileInfo) => {
  try {
    await axios.put(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/users/${userId}`,
      {
        password: newProfileInfo.password,
        email: newProfileInfo.email,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default editUser;
