import { setUserId } from "firebase/analytics";
import React, { useCallback, useEffect, useState } from "react";
import { baseURL } from '../firebase.config'

let logOutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  role: "u",
  userID: "",
  login: (token) => {},
  logOut: () => {},
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

  if (remainingTime <= 1800) {
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
    //console.log(url);
    fetch(url, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      res.json().then((data) => {
        //console.log(data);
        if (data!=null && data.role != null)
          setRole(data.role);

        setToken(token);
        setUserID(userID);        
    
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);    
        logOutTimer = setTimeout(logOutHandler, remainingTime);

      }).catch((err) => {
        console.log(err);
      });
    });
  };

  const logOutHandler = useCallback(() => {
    setToken(null);
    setUserID('')
    setRole('u')
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

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    userID: userID,
    login: loginHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
