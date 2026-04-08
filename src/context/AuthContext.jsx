import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const login = (user, remember = false) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (remember) {
      localStorage.setItem("isLoggedIn", "true");
    }
    window.dispatchEvent(new Event("userLogin"));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("userLogout"));
  };

  const isAuthenticated = () => !!currentUser;

  const hasRole = (role) => currentUser?.role === role;

  useEffect(() => {
    const handleStorage = () => {
      try {
        const user = localStorage.getItem("currentUser");
        setCurrentUser(user ? JSON.parse(user) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("userLogin", handleStorage);
    window.addEventListener("userLogout", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("userLogin", handleStorage);
      window.removeEventListener("userLogout", handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
