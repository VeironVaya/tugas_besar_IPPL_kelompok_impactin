import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (payload) => {
    const data = await loginAPI(payload);
    localStorage.setItem("token", data.token);

    setUser({
      username: payload.username,
    });

    setLoading(false);
  };

  const register = async (payload) => {
    await registerAPI(payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
