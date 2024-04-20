import { useCallback } from "react";

const useDebounce = (callback: Function, delay: number) => {
  const debounce = useCallback(
    (...args: any[]) => {
      let timeoutId: NodeJS.Timeout;
      // @ts-ignore
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounce;
};

export default useDebounce;
