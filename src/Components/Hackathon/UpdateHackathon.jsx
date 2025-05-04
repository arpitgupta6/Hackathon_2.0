import React, { useState, useEffect } from 'react';

const UpdateHackathon = ({ selectedHackathon }) => {
  // Convert ISO date to YYYY-MM-DD for input fields
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : '';
  };
  const token = localStorage.getItem('authToken');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [prize, setPrize] = useState('');

  // Load initial values from selectedHackathon
  useEffect(() => {
    if (selectedHackathon) {
      setTitle(selectedHackathon.title || '');
      setDescription(selectedHackathon.description || '');
      setStartDate(formatDate(selectedHackathon.start_date));
      setEndDate(formatDate(selectedHackathon.end_date));
      setPrize(selectedHackathon.prize || '');
    }
  }, [selectedHackathon]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://mentor-app-api.onrender.com/hackathons/create-hackathon/${selectedHackathon.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          start_date,
          end_date,
          prize
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update hackathon");
      }

      alert("✅ Hackathon updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Error updating hackathon");
    }
  };

  if (!selectedHackathon) {
    return <p>Loading hackathon data...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Hackathon</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Prize</label>
          <input
            type="number"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          onClick={handleUpdate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Hackathon
        </button>
      </form>
    </div>
  );
};

export default UpdateHackathon;
