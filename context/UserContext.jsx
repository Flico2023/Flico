import React, { createContext, useState } from "react";

export const UserContext = createContext({
  getUserId: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(31);

  function updateSingleFilter(name, value) {
    setFilters({ ...filters, [name]: value });
  }

  //BURDA BUG VAR MI ACAABA USERID GÜNCELLENİYOR MU
  function getUserId() {
    return userId;
  }

  return (
    <UserContext.Provider value={{ getUserId, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
