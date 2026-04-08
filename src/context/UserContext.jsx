import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const updateUser = (updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    localStorage.setItem("currentUser", JSON.stringify(merged));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem("currentUser");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("userLogin", sync);
    window.addEventListener("userLogout", sync);
    return () => {
      window.removeEventListener("userLogin", sync);
      window.removeEventListener("userLogout", sync);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export default UserContext;
