import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../api/auth";
import { getProfileAPI } from "../api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== LOGIN =====
  const login = async (payload) => {
    const data = await loginAPI(payload);

    // SIMPAN TOKEN & USER ID
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.data.id);

    const profile = await getProfileAPI(data.data.id);
    setUser(profile);
    setLoading(false);
  };

  // ===== REGISTER =====
  const register = async (payload) => {
    await registerAPI(payload);
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUser(null);
  };

  // ===== AUTO LOGIN (REFRESH PAGE) =====
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfileAPI(userId);
        setUser(profile);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
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
