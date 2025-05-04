import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import SignInLogo from "../../assets/SignInLogo.svg";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    try {
      const response = await fetch(
        " https://mentor-app-api.onrender.com/accounts/signin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign-In failed");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", data.role);
        console.log("Token and Role stored:", data.token, data.role);
        navigate("/hackathon"); // Redirect on success
      } else {
        console.warn("No token received from the server");
      }
      console.log("Login successful", data);
      navigate("/Hackathon"); // Redirect on success
    } catch (error) {
      console.error("Sign-In Error:", error.message);
      setErrorMessage(error.message); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#A3C4FD]">
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-6xl flex flex-col md:flex-row items-center">
      {/* Left Section - Logo */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={SignInLogo}
          alt="Logo"
          className="w-3/4 max-w-[300px] h-auto object-contain"
        />
      </div>
  
      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2946ae] text-center mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSignIn}>
          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-lg md:text-xl text-[#333333] font-semibold mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3">
              <MdEmail className="text-gray-500 text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                required
              />
            </div>
          </div>
  
          {/* Password Input */}
          <div className="mb-5">
            <label className="block text-lg md:text-xl text-[#333333] font-semibold mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3 relative">
              <RiLockPasswordFill className="text-gray-500 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-600"
              >
                {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
              </button>
            </div>
          </div>
  
          {/* Forgot Password */}
          <div className="text-right mb-5">
            <span
              className="text-blue-600 text-base md:text-lg font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>
  
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 font-semibold mb-4 text-center border border-red-600 rounded-full p-3 bg-red-100">
              {errorMessage}
            </div>
          )}
  
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full text-base md:text-lg bg-[#2946ae] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>
  
        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600 text-base md:text-lg">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline font-bold"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  </div>
  
  );
}
