import React, { useEffect, useState } from "react";

const HackathonApplication = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "https://mentor-app-api.onrender.com/hackathons/create-hackathon/applications/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
    <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6">
      Hackathon Applications
    </h2>
  
    {loading ? (
      <p className="text-gray-500 text-lg">⏳ Loading applications...</p>
    ) : error ? (
      <p className="text-red-500 font-medium text-lg">❌ {error}</p>
    ) : applications.length === 0 ? (
      <p className="text-gray-500 text-lg"> No applications found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-700">
                {app.hackathon_title}
              </h3>
              <span className="text-xs sm:text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                ID #{app.id}
              </span>
            </div>
  
            <div className="mt-2">
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-medium">Email:</span> {app.user_email}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                <span className="font-medium"> Applied At:</span> {formatDate(app.applied_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default HackathonApplication;
