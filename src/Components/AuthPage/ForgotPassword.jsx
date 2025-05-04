import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ForgotLogo from "../../assets/ForgotLogo.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://mentor-app-api.onrender.com/accounts/forgot-password/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debugging: Check API response

      if (response.ok && data.message === "OTP sent to email") {
        setErrorMessage(""); // clear any previous error
        alert("One time OTP sent to your email.");
        navigate(
          `/forgot-password/verify-reset-otp?email=${encodeURIComponent(email)}`
        );
      } else {
        setErrorMessage(data.error || "Email not found. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-[#A3C4FD]">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl flex flex-row items-center">
        <div className="w-1/2 flex justify-center">
          <img src={ForgotLogo} alt="Logo" className="w-[100%] h-[50%] mb-4" />
        </div>
        <div className="relative z-10 bg-white p-8 rounded-3xl w-full max-w-md">
          <h3 className="text-3xl font-bold text-[#2946ae] text-center mb-4">
            Forgot Password?
          </h3>
          <p className="text-lg font-medium text-gray-600 mb-6">
            Enter your email to reset your password.
          </p>

          <form onSubmit={handleForgotPassword}>
            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-xl text-[#333333] font-semibold mb-2">
                Email
              </label>
              <div className="flex items-center bg-gray-100 rounded-full border border-gray-500 px-4 py-3 shadow-sm">
                <MdEmail className="text-gray-500 text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent focus:outline-none px-3 text-gray-800"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-600 font-semibold mb-4 text-center">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-lg bg-[#2946ae] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Send OTP
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="mt-6 text-center text-gray-600 text-lg">
            Back to{" "}
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
