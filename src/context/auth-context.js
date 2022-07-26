import React, { useCallback, useEffect, useState } from "react";
import { baseURL } from "../firebase.config";

let logOutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  role: () => "u",
  userID: "",
  login: (token) => {},
  logOut: () => {},
  setUserIdFunc: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userID, setUserID] = useState("");
  const userIsLoggedIn = !!token; // !! - convert true or false to: Logical true or false
  const [role, setRole] = useState("u");

  const loginHandler = (token, expirationTime, userID) => {
    //Autorization - get user role
    const url = `${baseURL}/users/${userID}.json`;

    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      res
        .json()
        .then((data) => {
          if (data != null && data.role != null) {
            if (data.role === "a" || data.role === "u") {
              setRole(data.role);
            } else setRole("u");
          }

          setToken(token);
          setUserID(userID);

          localStorage.setItem("token", token);
          localStorage.setItem("expirationTime", expirationTime);
          const remainingTime = calculateRemainingTime(expirationTime);
          logOutTimer = setTimeout(logOutHandler, remainingTime);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const logOutHandler = useCallback(() => {
    setToken(null);
    setUserID("");
    setRole("u");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logOutTimer) {
      clearTimeout(logOutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      logOutTimer = setTimeout(logOutHandler, tokenData.duration);
    }
  }, [tokenData, logOutHandler]);

  const handleRole = () => {
    if (userID) {
      const url = `${baseURL}/users/${userID}.json`;
      fetch(url, {
        method: "GET",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Request failed!");
        }
        res
          .json()
          .then((data) => {
            if (data != null && data.role != null) {
              if (data.role === "a" || data.role === "u") {
                setRole(data.role);
              }
              //
              else setRole("u");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });

      return role;
    }
  };
  useEffect(() => {
    handleRole();
  }, [userID]);

  const setUserIDHandler = (id) => {
    setUserID(id);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: handleRole,
    userID: userID,
    login: loginHandler,
    logOut: logOutHandler,
    setUserIdFunc: setUserIDHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
