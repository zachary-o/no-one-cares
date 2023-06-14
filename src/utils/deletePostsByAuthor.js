import axios from "axios";

const deletePostsByAuthor = async (author) => {
  try {
    const response = await axios.get(
      `https://646d10197b42c06c3b2c7fc2.mockapi.io/posts?author=${author}`
    );

    for (const post of response.data) {
      await axios.delete(
        `https://646d10197b42c06c3b2c7fc2.mockapi.io/posts/${post.id}`
      );
    }

    console.log(`Successfully deleted all posts by ${author}`);
  } catch (error) {
    console.error(error);
  }
};

export default deletePostsByAuthor;
