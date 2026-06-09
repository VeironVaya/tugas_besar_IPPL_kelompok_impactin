import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, User, Lock } from "lucide-react";
import LOGO from "../../assets/impactin_logo.png";
import BGLOGIN from "../../assets/bg login.png";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Password tidak sama!");
      return;
    }

    try {
      await register({
        email,
        username,
        password,
      });

      alert("Register berhasil! Silakan login 😊");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-between px-16 relative"
      style={{ backgroundImage: `url(${BGLOGIN})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Left Text */}
      <div className="relative z-10 text-white font-extrabold text-6xl max-w-lg ml-20 leading-tight">
        <p>Enter Into</p>
        <p>The Nature</p>
        <p>World</p>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-10 mx-20 shadow-2xl">
        <div className="w-full flex justify-center mb-2">
          <img src={LOGO} alt="logo" className="w-40" />
        </div>

        <p className="text-gray-200 text-sm text-center mb-8">
          Please fill in the form to create an account
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex items-center bg-white/20 rounded-full px-4 py-3">
            <Mail className="text-gray-200 w-5 h-5 mr-3" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent w-full text-gray-100 focus:outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-full px-4 py-3">
            <User className="text-gray-200 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent w-full text-gray-100 focus:outline-none text-sm"
              value={username}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white/20 rounded-full px-4 py-3">
            <Lock className="text-gray-200 w-5 h-5 mr-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="bg-transparent w-full text-gray-100 focus:outline-none text-sm"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition duration-200">
            SIGN UP
          </button>
        </form>

        <p className="text-gray-200 text-sm mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-white hover:underline underline-offset-4"
          >
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
