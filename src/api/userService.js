import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user) => {
  return await axios.post(BASE_URL, user);
};

export const updateUser = async (id, user) => {
  return await axios.put(`${BASE_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};