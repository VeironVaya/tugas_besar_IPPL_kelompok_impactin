import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Lock } from "lucide-react";
import LOGO from "../../assets/impactin_logo.png";
import BGLOGIN from "../../assets/bg login.png";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-between px-16 relative"
      style={{
        backgroundImage: `url(${BGLOGIN})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Left Side Text */}
      <div className="relative z-10 text-white font-extrabold text-[70px] leading-tight max-w-md opacity-50 space-y-4">
        <p>Enter Into</p>
        <p>The Nature</p>
        <p>World</p>
      </div>

      {/* Right Form Box */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
        {/* Logo */}
        <div className="w-full flex justify-center mb-6">
          <img src={LOGO} alt="logo" className="w-40" />
        </div>

        <p className="text-gray-200 text-sm text-center mb-8">
          Welcome Back! Drop your registered username
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white/20 rounded-full px-4 py-3">
            <User className="text-gray-200 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent w-full text-gray-100 focus:outline-none text-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-full px-4 py-3">
            <Lock className="text-gray-200 w-5 h-5 mr-3" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent w-full text-gray-100 focus:outline-none text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition duration-200"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-gray-200 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-white hover:underline underline-offset-4"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
