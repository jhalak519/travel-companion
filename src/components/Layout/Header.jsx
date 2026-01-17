import React, { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import AboutModal from "./AboutModal";

const Header = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <div className="h-16 bg-white shadow-md flex items-center px-6 z-20 relative text-gray-800">
        <div className="flex items-center gap-2 text-pink-500">
          <FaMapMarkedAlt className="text-2xl" />
          <h1 className="text-xl font-bold tracking-tight">TravelCompanion</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-600 hover:text-pink-500 font-medium text-sm transition-colors"
          >
            About
          </button>
        </div>
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};

export default Header;
