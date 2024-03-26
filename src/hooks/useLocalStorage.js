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
    const valueToStore =
      value instanceof Function ? value(storageValue) : value;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  }
  return [storageValue, setStorageValue];
};

export default useLocalStorage;
