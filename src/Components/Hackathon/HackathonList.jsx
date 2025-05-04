import React, { useState, useEffect } from "react";
import HackathonCard from "./HackathonCard";

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(
          "https://mentor-app-api.onrender.com/hackathons/create-hackathon/"
        );
        const data = await response.json();
        setHackathons(data.data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    };

    fetchHackathons();
  }, []);

  const handleSelectForUpdate = async (hackathon) => {
    try {
      const response = await fetch(
        `https://mentor-app-api.onrender.com/hackathons/create-hackathon/${hackathon.id}/`
      );
      const data = await response.json();
      setSelectedHackathon(data); // ✅ full latest data set
      setIsUpdateOpen(true); // ✅ open modal
    } catch (error) {
      console.error("Failed to fetch hackathon details", error);
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {hackathons.map((hackathon) => (
        <HackathonCard
          key={hackathon.id}
          id={hackathon.id}
          hackathon={hackathon}
          onSelectForUpdate={handleSelectForUpdate}
          isUpdateOpen={isUpdateOpen}
          setIsUpdateOpen={setIsUpdateOpen}
          selectedHackathon={selectedHackathon}
        />
      ))}
    </div>
  );
};

export default HackathonList;
