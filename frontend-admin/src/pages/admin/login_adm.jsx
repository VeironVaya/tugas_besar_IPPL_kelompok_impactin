import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Lock } from "lucide-react";
import LOGO from "../../assets/impactin_logo.png";
import { useAuth } from "../../context/AuthContext";

const LoginAdmPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/approval");
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">
      {/* Login Box */}
      <div className="w-full max-w-lg bg-gray-100 rounded-3xl p-10 shadow-2xl">
        {/* Logo */}
        <div className="w-full flex justify-center mb-6">
          <img src={LOGO} alt="logo" className="w-40" />
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm">
            <User className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm">
            <Lock className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-full font-semibold transition"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmPage;
