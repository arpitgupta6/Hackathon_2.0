import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe99",
    email: "johndoe@example.com",
    bio: "Full Stack Developer | Tech Enthusiast | Open Source Contributor",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <div className="flex flex-col items-center mb-4">
          <img src={user.profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover overflow-hidden" />
          <h2 className="text-2xl font-bold mt-2">{user.name}</h2>
          <p className="text-gray-500 text-sm">@{user.username}</p>
          <p className="text-gray-600 mt-1">📍 {user.location}</p>
          <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-1">
            🌐 {user.website}
          </a>
        </div>
        
        {!isEditing ? (
          <div className="text-left">
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Bio:</strong> {user.bio}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="text-left mt-4">
            <input className="w-full p-2 border rounded mb-2" type="text" name="name" value={updatedUser.name} onChange={handleChange} />
            <input className="w-full p-2 border rounded mb-2" type="text" name="username" value={updatedUser.username} onChange={handleChange} />
            <input className="w-full p-2 border rounded mb-2" type="email" name="email" value={updatedUser.email} onChange={handleChange} />
            <input className="w-full p-2 border rounded mb-2" type="text" name="location" value={updatedUser.location} onChange={handleChange} />
            <input className="w-full p-2 border rounded mb-2" type="text" name="website" value={updatedUser.website} onChange={handleChange} />
            <textarea className="w-full p-2 border rounded mb-2" name="bio" value={updatedUser.bio} onChange={handleChange}></textarea>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600" onClick={handleSave}>
              Save Changes
            </button>
            <button className="mt-2 ml-2 px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;