import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResetPasswordOtpLogo from "../../assets/ResetPasswordOtpLogo.svg";

const VerifyResetOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!email || !enteredOtp) {
      setError("Email and OTP are required");
      return;
    }

    setError(""); 
    setSuccessMessage(""); 

    try {
      const response = await fetch("https://mentor-app-api.onrender.com/accounts/verify-reset-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP Verified Successfully! Redirecting...");
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(email)}&otp=${enteredOtp}`);
        }, 2000); 
      } else {
        setError(data.error || "Invalid OTP, please try again.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-[#A3C4FD]">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl flex flex-row items-center">
        <div className="w-1/2 flex justify-center">
          <img src={ResetPasswordOtpLogo} alt="Logo" className="w-[100%] h-[50%] mb-4" />
        </div>
        <div className="relative z-10 bg-white p-8 rounded-3xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#2946ae] text-center mb-4">OTP Verification</h2>
          <p className="text-lg text-gray-600 text-center mb-6">
            Enter the OTP sent to{" "}
            <span className="font-semibold text-blue-500">{email}</span>
          </p>

          {/* Messages Section */}
          {error && (
            <p className="text-red-500 text-center font-medium mb-4">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center font-medium mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleVerifyOtp} className="flex flex-col items-center">
            <div className="flex justify-center gap-3 mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full text-lg bg-[#2946ae] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Verify OTP
            </button>
          </form>

          <p className="mt-4 text-center text-lg text-gray-600">
            Didn't receive OTP?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline font-bold">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOTP;
