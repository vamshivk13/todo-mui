import { useState } from "react";

const useLocalStorage = (key, value) => {
  const [storageValue, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    if (
      localStorageValue != "" &&
      localStorageValue != null &&
      localStorageValue != undefined
    ) {
      return JSON.parse(localStorageValue);
    } else {
      return value;
    }
  });
  function setStorageValue(value) {
    setValue((prevValue) => {
      const val = value instanceof Function ? value(prevValue) : value;
      localStorage.setItem(key, JSON.stringify(val));
      return val;
    });
  }
  return [storageValue, setStorageValue];
};

export default useLocalStorage;
