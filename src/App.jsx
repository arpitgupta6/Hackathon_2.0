import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Components/Hackathon/MainPage";
import SignIn from "./Components/AuthPage/SignIn";
import SignUp from "./Components/AuthPage/SignUp";
import ForgotPassword from "./Components/AuthPage/ForgotPassword";
import OtpVerification from "./Components/AuthPage/OtpVerification";
import ResetPassword from "./Components/AuthPage/ResetPassword";
import VerifyResetOTP from "./Components/AuthPage/VerifyResetOTP";
import PrivateRoute from "./Components/AuthPage/PrivateRoute";
// import Profile from "./Components/AuthPage/Profile";
// import MentorDashboard from "./Components/Hackathon/MentorDashboard";
// import UserDashboard from "./Components/Hackathon/UserDashboard";
import CreateHackathon from "./Components/Hackathon/CreateHackathon";
import HackathonDetail from "./Components/Hackathon/HackathonDetail";
import ApplyHackathon from "./Components/Hackathon/HackathonApplication";
import DashboardLayout from "./Components/Hackathon/DashboardLayout";
// Uncomment if needed
// import CreateHackathon from "./Components/Hackathon/CreateHackathon";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify-reset-otp" element={<VerifyResetOTP />}/>
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Route for Hackathon */}
        <Route element={<PrivateRoute />}>
          <Route exact path="/Hackathon" element={<MainPage />} />
          <Route exact path="/create-hackathon" element={<CreateHackathon />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
          <Route path="/hackathon/:id/apply" element={<ApplyHackathon />} />
          <Route path="/user-dashboard" element={<DashboardLayout />} />
        </Route>

     
        
      </Routes>
    </>
  );
};

export default App;
