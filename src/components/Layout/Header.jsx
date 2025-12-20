import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="h-16 bg-white shadow-md flex items-center px-6 z-20 relative text-gray-800">
            <div className="flex items-center gap-2 text-blue-600">
                <FaMapMarkedAlt className="text-2xl" />
                <h1 className="text-xl font-bold tracking-tight">TravelCompanion</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
                <button className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                    About
                </button>
            </div>
        </div>
    );
};

export default Header;
