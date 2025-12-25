import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../api/auth";
import { getProfileAPI } from "../api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (payload) => {
    const data = await loginAPI(payload);
    localStorage.setItem("token", data.token);

    const profile = await getProfileAPI();
    setUser(profile);

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
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfileAPI();
        setUser(profile);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
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
