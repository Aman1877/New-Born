import { useState, useEffect, useContext, createContext } from "react";

// Creating a new context
const AuthContext = createContext();

// Create a Provider function
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: "null",
    token: "",
  });

  // Get Auth data from local storage that other components can access
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
