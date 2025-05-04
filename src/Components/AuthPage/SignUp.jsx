import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SignUpLogo from "../../assets/SignUpLogo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://mentor-app-api.onrender.com/accounts/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            role: formData.role,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", formData.role);
        toast.success(`OTP sent to your email: ${formData.email}`);
        setTimeout(() => {
          navigate("/otp-verification", { state: { email: formData.email } });
        }, 2000);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 px-4 bg-[#A3C4FD]">
      <ToastContainer position="top-center" />
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Left Section - Logo */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={SignUpLogo} alt="Logo" className="w-full max-w-xs md:max-w-sm h-auto" />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2946ae] text-center mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSignUp}>
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mb-5 w-full">
                <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-2.5 md:p-3 bg-gray-100 border border-gray-500 rounded-full text-gray-800 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-5 w-full">
                <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-2.5 md:p-3 bg-gray-100 border border-gray-500 rounded-full text-gray-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
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

            {/* Role Selection */}
            <div className="mb-5">
              <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
                Role
              </label>
              <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3">
                <FaUser className="text-gray-500 text-xl" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mb-5 w-full">
                <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
                  Create Password
                </label>
                <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3">
                  <RiLockPasswordFill className="text-gray-500 text-xl" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
                    className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="mb-5 w-full">
                <label className="block text-base md:text-xl text-[#333333] font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3">
                  <RiLockPasswordFill className="text-gray-500 text-xl" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full text-lg bg-[#2946ae] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-600 text-base md:text-lg">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline font-bold"
              onClick={() => navigate("/")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
