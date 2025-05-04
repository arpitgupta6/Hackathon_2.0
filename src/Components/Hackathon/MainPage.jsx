import React from "react";
import Navbar from "./Navbar"; //Navbar Component
import DashboardLayout from "./DashboardLayout"; // Dashboard Layout Component

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <DashboardLayout />
    </div>
  );
};

export default Dashboard;
