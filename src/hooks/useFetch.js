import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../store/AuthProvider";

const useFetch = (method, path) => {
  const [response, setResponse] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    user: { userId },
  } = useContext(authContext);

  const axiosInstance = axios.create({
    baseURL: `https://todo-mui-vk-default-rtdb.firebaseio.com/${userId}`,
  });

  function makeAPIRequest(data) {
    if (method == "POST") {
      setIsFetchLoading(true);
      return axiosInstance
        .post(path, data)
        .then((response) => {
          setResponse(response.data);
          setIsFetchLoading(false);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 1000);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (method == "GET") {
      return axiosInstance.get(path).then((response) => {
        setResponse(response.data);
      });
    } else if (method == "DELETE") {
      setIsFetchLoading(true);
      axiosInstance.delete(path + data).then((response) => {
        setResponse(response.data);
        setIsFetchLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 1000);
      });
    } else if (method == "UPDATE") {
      setIsFetchLoading(true);
      axiosInstance.put(path + data.route, data.data).then((response) => {
        setResponse(response.data);
        setIsFetchLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 1000);
      });
    }
  }

  return [response, makeAPIRequest, isFetchLoading, isSuccess];
};

export default useFetch;
