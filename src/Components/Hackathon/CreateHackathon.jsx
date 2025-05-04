import React, { useState } from "react";

const CreateHackathon = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prize, setPrize] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You need to be logged in to create a hackathon.");
      return;
    }

    const newHackathon = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      prize,
      status: true,
    };

    try {
      const response = await fetch(
        "https://mentor-app-api.onrender.com/hackathons/create-hackathon/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(newHackathon),
        }
      );

      if (!response.ok) throw new Error("Failed to create hackathon");

      await response.json();
      setSuccess("✅ Hackathon created successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setPrize("");
    } catch (error) {
      setError("❌ Failed to create hackathon. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="w-full overflow-y-hidden max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in">
    <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
      Create a New Hackathon
    </h2>
  
    {error && <div className="text-red-600 text-center mb-4">{error}</div>}
    {success && (
      <div className="text-green-600 text-center mb-4">{success}</div>
    )}
  
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          placeholder="Hackathon name"
        />
      </div>
  
      <div>
        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          placeholder="What is this hackathon about?"
        />
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>
  
        <div>
          <label className="block mb-1 font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>
      </div>
  
      <div>
        <label className="block mb-1 font-medium text-gray-700">Prize Amount (₹)</label>
        <input
          type="number"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          placeholder="Enter amount"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
      >
        Submit Hackathon
      </button>
    </form>
  </div>
  
  );
};

export default CreateHackathon;
