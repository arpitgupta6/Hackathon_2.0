import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-white p-4 shadow-xl ">
        <div className="flex items-center gap-10">
          <ul>
            <li className="text-gray-700 font-bold text-xl hover:text-blue-600 hover:underline cursor-pointer">
              Profile
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex gap-10">
            <li className="text-gray-700 font-bold text-xl hover:text-blue-600 hover:underline cursor-pointer">
              Home
            </li>
            <li className="text-gray-700 font-bold text-xl hover:text-blue-600 hover:underline cursor-pointer">
              About
            </li>
            <li className="text-gray-700 font-bold text-xl hover:text-blue-600 hover:underline cursor-pointer">
              Contact
            </li>
          </ul>
          <button className="bg-blue-600 text-white p-2 rounded-md cursor-pointer ">
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
