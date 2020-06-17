import { useState, useEffect, useCallback } from "react";

export function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export function useWindowKeyup(key, fn) {
  const handleKeyup = useCallback(
    e => {
      if (e.key === key) fn();
    },
    [key, fn]
  );

  useEffect(() => {
    window.removeEventListener("keyup", handleKeyup);
    window.addEventListener("keyup", handleKeyup);

    return function cleanupKeyupListener() {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [key]);
}
