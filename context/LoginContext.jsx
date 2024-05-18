import React, { createContext, useContext, useState, useEffect } from "react";

// Context'i oluştur
const LoginContext = createContext(null);

// Custom hook kullanımını kolaylaştırır
export const useLogin = () => useContext(LoginContext);

// Provider component'i
export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(1);
  const [expireTime, setExpireTime] = useState(new Date());
  const [role, setRole] = useState("");

  useEffect(() => {
    // Client-side'da çalıştır
    const jwtToken = localStorage.getItem("jwtToken") || "";

    const userId = 1//test amaçlı hep 1 parseInt(localStorage.getItem("userId")) || 1; 
    const expireTime = new Date(localStorage.getItem("expireTime"));
    const role = localStorage.getItem("role") || "";

    setToken(jwtToken);
    setUserId(userId);
    setExpireTime(expireTime);
    setRole(role);
  }, []);


  return (
    <LoginContext.Provider value={{ token, setToken, userId, setUserId, expireTime, setExpireTime, role, setRole }}>
      {children}
    </LoginContext.Provider>
  );
};


/*import React, { createContext, useContext, useState, useEffect } from "react";

// Context'i oluştur
const LoginContext = createContext(null);

// Custom hook kullanımını kolaylaştırır
export const useLogin = () => useContext(LoginContext);

// Provider component'i
export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || "");
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");
  const [expireTime, setExpireTime] = useState(() =>
    new Date(localStorage.getItem("expireTime")) 
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");


  return (
    <LoginContext.Provider value={{ token, setToken, userId, expireTime, setExpireTime, setUserId }}>
      {children}
    </LoginContext.Provider>
  );
};*/
