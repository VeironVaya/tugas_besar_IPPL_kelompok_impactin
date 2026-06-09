import { createContext, useState, useContext } from "react";
import { loginApi } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const login = async (username, password) => {
    try {
      const res = await loginApi(username, password);

      const token = res.data.token;
      const user = res.data.data;

      localStorage.setItem("token", token);
      setToken(token);        // ✅ FIX
      setUser(user);

      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.href = "/Login_adm";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
