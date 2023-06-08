import { useState, useCallback } from "react";
import { IVacancy } from "../types/vacancy.interface";

function useLocalStorage(key: string, initialValue: []) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (value: IVacancy[]) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  return { storedValue, setValue };
}

export default useLocalStorage;
