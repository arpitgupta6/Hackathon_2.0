import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiLockPasswordFill, RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import ResetPasswordLogo from "../../assets/ResetPasswordLogo.svg";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams(); // Get token from URL
  const email = searchParams.get("email");
  const otp = searchParams.get("otp")?.replace(/[^\d]/g, ""); 
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage(""); // Clear previous errors

    const payload = { 
      email: email || "", 
      otp: otp || "", 
      new_password: password || "" 
    };
    console.log("Payload:", payload); // Debugging

    try {
      const response = await fetch(
        "https://mentor-app-api.onrender.com/accounts/reset-password/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => null);
      console.log("API Response:", data);

      if (response.status === 404) {
        setErrorMessage("Reset password endpoint not found. Check backend.");
      } else if (!response.ok) {
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
      } else {
        setSuccessMessage("Password reset successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-[#A3C4FD]">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl flex flex-row items-center">
        <div className="w-1/2 flex justify-center">
          <img
            src={ResetPasswordLogo}
            alt="Logo"
            className="w-[100%] h-[50%] mb-4"
          />
        </div>
        <div className="relative z-10 bg-white p-8 rounded-3xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-[#2946ae] text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleResetPassword}>
            {/* New Password Input */}
            <div className="mb-5">
              <label className="block text-xl text-[#333333] font-semibold mb-2">
                New Password
              </label>
              <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3 relative">
                <RiLockPasswordFill className="text-gray-500 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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

            {/* Confirm Password Input */}
            <div className="mb-5">
              <label className="block text-xl text-[#333333] font-semibold mb-2">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-500 rounded-full bg-gray-100 px-4 py-3 relative">
                <RiLockPasswordFill className="text-gray-500 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
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
            {errorMessage && (
              <div className="text-red-600 font-semibold mb-4 text-center">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="text-green-600 font-semibold mb-4 text-center">
                {successMessage}
              </div>
            )}

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full text-lg bg-[#2946ae] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
