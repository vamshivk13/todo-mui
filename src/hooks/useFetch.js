import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../store/AuthProvider";

const useFetch = (method, path) => {
  const [response, setResponse] = useState([]);
  const {
    user: { userId: uid },
  } = useContext(authContext);

  const axiosInstance = axios.create({
    baseURL: `https://todo-mui-vk-default-rtdb.firebaseio.com/${uid}`,
  });

  console.log(method, " ", path, " ", response);

  function makeAPIRequest(data) {
    if (method == "POST") {
      return axiosInstance
        .post(path, data)
        .then((response) => {
          setResponse(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (method == "GET") {
      axiosInstance.get(path).then((response) => setResponse(response.data));
    } else if (method == "DELETE") {
      axiosInstance
        .delete(path + data)
        .then((response) => setResponse(response.data));
    } else if (method == "UPDATE") {
      axiosInstance
        .put(path + data.route, data.data)
        .then((response) => setResponse(response.data));
    }
  }

  return [response, makeAPIRequest];
};

export default useFetch;
