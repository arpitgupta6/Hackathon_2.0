// components/Hackathon/HackathonDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HackathonDetail = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(`https://mentor-app-api.onrender.com/hackathons/create-hackathon/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch hackathon details');
        }
        const data = await response.json();
        setHackathon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!hackathon) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Hackathon Details</h2>
      <p className="text-xl font-semibold mb-2">{hackathon.title}</p>
      <p className="text-gray-600 mb-2">{hackathon.description}</p>
      <p className="text-sm text-gray-500">Start: {hackathon.start_date}</p>
      <p className="text-sm text-gray-500 mb-2">End: {hackathon.end_date}</p>
      <p className="text-green-600 font-semibold mb-2">Prize: ₹{hackathon.prize}</p>
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm ${
          hackathon.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {hackathon.status ? 'Open' : 'Closed'}
      </span>
    </div>
  );
};

export default HackathonDetail;
