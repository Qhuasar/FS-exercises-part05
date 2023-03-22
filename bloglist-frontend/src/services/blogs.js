import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const createBlog = async (data) => {
  try {
    const respnse = await axios.post(baseUrl, data, {
      headers: {
        Authorization: token,
      },
    });
    return respnse.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken };
