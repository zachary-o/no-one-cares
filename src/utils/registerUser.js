import axios from "axios";

const registerUser = async (user) => {
  const response = await axios.post(
    "https://646d10197b42c06c3b2c7fc2.mockapi.io/users", user
  );

  const data = response.data;
  return data;
};

export default registerUser
