import axios from "axios";

import { getAuth } from "firebase/auth";

const axiosInstance = axios.create();

export const setBaseUrl = (userId) => {
  axiosInstance.defaults.baseURL = `https://todo-mui-vk-default-rtdb.firebaseio.com/${userId}`;
};
function fetchAPI(method, path, data) {
  if (method == "POST") {
    return axiosInstance
      .post(path, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (method == "GET") {
    return axiosInstance.get(path).then((response) => {
      return response.data;
    });
  } else if (method == "DELETE") {
    axiosInstance.delete(path + data).then((response) => {
      return response.data;
    });
  } else if (method == "UPDATE") {
    axiosInstance.put(path + data.route, data.data).then((response) => {
      return response.data;
    });
  }
}

export default fetchAPI;
