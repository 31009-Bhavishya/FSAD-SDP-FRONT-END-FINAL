import { useState, useEffect } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("currentUser"));

  useEffect(() => {
    const syncUser = () => {
      try {
        const user = localStorage.getItem("currentUser");
        const parsed = user ? JSON.parse(user) : null;
        setCurrentUser(parsed);
        setIsLoggedIn(!!parsed);
      } catch {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("userLogin", syncUser);
    window.addEventListener("userLogout", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("userLogin", syncUser);
      window.removeEventListener("userLogout", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const login = (user, remember = false) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (remember) localStorage.setItem("isLoggedIn", "true");
    setCurrentUser(user);
    setIsLoggedIn(true);
    window.dispatchEvent(new Event("userLogin"));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("userLogout"));
  };

  const hasRole = (role) => currentUser?.role === role;

  return { currentUser, isLoggedIn, login, logout, hasRole };
};

export default useAuth;
