import axios from "axios";

const getPosts = async () => {
  const response = await axios.get(
    "https://646d10197b42c06c3b2c7fc2.mockapi.io/posts"
  );

  const data = response.data;
  return data;
};

export default getPosts;
