import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-white p-4 shadow-xl">
        <div className="flex items-center gap-10">
          <ul>
          <li>
            <Link to="/Profile" className="text-gray-700 font-bold text-2xl hover:text-blue-600">
              Profile
            </Link>
          </li>
        </ul>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex gap-10">
            <li>
              <a
                href="/"
                className="text-gray-700 font-bold text-xl hover:text-blue-600"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-700 font-bold text-xl hover:text-blue-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-700 font-bold text-xl hover:text-blue-600"
              >
                Contact
              </a>
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
