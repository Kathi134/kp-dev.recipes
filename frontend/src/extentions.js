import { useState, useEffect } from "react";

// custom useLocalStorage hook
function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


// convert arbitrary object to <Select> compatible option
export const convertToSelectOption = (object) => {
  return ({value: object, label: object.name})
}


export const secondsToHumanReadable = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value / 60) % 60);
  const seconds = Math.floor((value / 1) % 60);

  let text = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  if(hours)
    return `${hours}:${text} h`;
  else
    return `${text} min`
}