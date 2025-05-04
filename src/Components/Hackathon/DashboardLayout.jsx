import React, { useState } from "react";
import HackathonList from "./HackathonList";
// import HackathonDetail from "./HackathonDetail";
import HackathonApplication from "./HackathonApplication";
import CreateHackathon from "./CreateHackathon";
// import UpdateHackathon from "./UpdateHackathon";

const DashboardLayout = () => {
  const [activeView, setActiveView] = useState("list");
  const [selectedHackathon, setSelectedHackathon] = useState(null); // store selected data for update

  // const handleUpdateClick = () => {
  //   setActiveView("update");
  // };

  const renderContent = () => {
    switch (activeView) {
      case "list":
        return (
          <HackathonList
            onSelectForUpdate={(hackathon) => {
              setSelectedHackathon(hackathon);
              setActiveView("update");
            }}
          />
        );
      case "application":
        return <HackathonApplication />;
      case "create":
        return <CreateHackathon />;
      default:
        return <HackathonList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveView("list")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeView === "list"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Hackathon List
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView("application")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeView === "application"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Hackathon Application
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView("create")}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeView === "create"
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Create Hackathon
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default DashboardLayout;
