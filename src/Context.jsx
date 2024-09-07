import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [Auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ token, setToken, Auth, setAuth, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
