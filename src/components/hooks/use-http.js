import { useCallback, useState } from "react";

const useHttp = (applyData) => {
  const [isAnim, setAnim] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setAnim(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something goes wrong ");
    }
    setAnim(false);
  }, []);

  return {
    isAnim,
    error,
    sendRequest,
  };
};

export default useHttp;
