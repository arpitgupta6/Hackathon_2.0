import React, { useState, useEffect } from "react";
import { Calendar, Trophy, BadgeCheck, Pencil } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const HackathonCard = ({
  hackathon,
  id,
  selectedHackathon,
  onUpdate = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const token = localStorage.getItem("authToken");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [prize, setPrize] = useState("");
  const [currentId, setCurrentId] = useState(null);

  // {delete API}
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://mentor-app-api.onrender.com/hackathons/create-hackathon/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        toast.success("🗑️ Hackathon deleted successfully!", { autoClose: 2000 });
      } else {
        toast.error("❌ Failed to delete hackathon.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error deleting hackathon:", error);
      toast.error("❌ Error deleting hackathon", { autoClose: 2000 });
    }
  };
  

  // {Register API}
  const handleRegister = async () => {
    if (!token) {
      toast.error("⚠️ Please log in to register.", { autoClose: 2000 });
      return;
    }
  
    const dummyData = {
      project_title: "Registered Project",
      github_link: "https://github.com/dummy/repo",
    };
  
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://mentor-app-api.onrender.com/hackathons/create-hackathon/${hackathon.id}/apply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(dummyData),
        }
      );
  
      if (!res.ok) throw new Error("Already registered or error occurred.");
  
      toast.success("✅ Registered successfully!", { autoClose: 2000 });
    } catch (err) {
      toast.error("❌ Error: You may have already registered.", { autoClose: 2000 });
    } finally {
      setIsLoading(false);
    }
  };
  

  // {Hackathon Details API}
  const fetchHackathonDetails = async (id) => {
    try {
      const res = await fetch(
        `https://mentor-app-api.onrender.com/hackathons/create-hackathon/${id}/`
      );
      if (!res.ok) throw new Error("Failed to fetch hackathon details");
      const data = await res.json();
      const hack = data.data;

      setTitle(hack.title || "");
      setDescription(hack.description || "");
      setStartDate(
        hack.start_date
          ? new Date(hack.start_date).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        hack.end_date ? new Date(hack.end_date).toISOString().split("T")[0] : ""
      );
      setPrize(hack.prize || "");
    } catch (error) {
      console.error("Fetch hackathon detail error:", error);
      toast.error("❌ Error loading hackathon details.");
    }
  };

  // {Hackathon Update API}
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentId) {
      toast.error("⚠️ No hackathon selected for update.");
      return;
    }
    try {
      const response = await fetch(
        `https://mentor-app-api.onrender.com/hackathons/create-hackathon/${currentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            start_date,
            end_date,
            prize,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update hackathon");
      }
  
      toast.success("✅ Hackathon updated successfully!", { autoClose: 2000 });
      setIsUpdate(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Error updating hackathon", { autoClose: 2000 });
    }
  };
  

  return (
    <>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-40 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-wide text-center px-2">
            {hackathon.title}
          </h1>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-3 text-sm sm:text-base">
            {hackathon.description}
          </p>

          <div className="flex items-center text-xs sm:text-sm text-gray-600 gap-2 mb-1">
            <Calendar size={16} />
            <span>
              {formatDate(hackathon.start_date)} –{" "}
              {formatDate(hackathon.end_date)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-blue-700 font-semibold mt-2">
            <Trophy size={18} />
            Prize: ₹{hackathon.prize}
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm mt-2">
            <BadgeCheck
              size={18}
              className={hackathon.status ? "text-green-600" : "text-red-500"}
            />
            <span
              className={`font-medium ${
                hackathon.status ? "text-green-600" : "text-red-500"
              }`}
            >
              {hackathon.status ? "Open for registration" : "Closed"}
            </span>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading || !hackathon.status}
            className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-full hover:brightness-110 disabled:opacity-60"
          >
            {isLoading ? "Registering..." : "Register Now"}
          </button>
          <ToastContainer position="top-center" autoClose={2000} />

          {/* Update Button */}
          <button
            onClick={() => {
              onUpdate(hackathon);
              setIsUpdate(true);
              setCurrentId(hackathon.id);
              fetchHackathonDetails(hackathon.id);
            }}
            className="mt-3 w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all"
          >
            <div className="flex justify-center items-center gap-2">
              <Pencil size={16} />
              Update
            </div>
          </button>

          {/* Delete Button */}
          <button
            className="mt-3 w-full py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {isUpdate && (
        <div className="fixed inset-0 bg-[#a3c4fd] bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative sm:p-8">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsUpdate(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              Update Hackathon
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold text-lg sm:text-xl">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-lg sm:text-xl">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-lg sm:text-xl">
                  Start Date
                </label>
                <input
                  type="date"
                  value={start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-lg sm:text-xl">
                  End Date
                </label>
                <input
                  type="date"
                  value={end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-lg sm:text-xl">
                  Prize
                </label>
                <input
                  type="number"
                  value={prize}
                  onChange={(e) => setPrize(e.target.value)}
                  className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full sm:px-6 sm:py-3"
              >
                Update Hackathon
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HackathonCard;
