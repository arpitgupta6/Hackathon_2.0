import React from "react";
import Navbar from "./Navbar"; // Common Navbar Component
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
  <UserDashboard/>
    </div>
  );
};

export default Dashboard;
