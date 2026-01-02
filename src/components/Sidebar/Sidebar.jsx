import React, { useState } from 'react';
import SearchBar from '../Search/SearchBar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ onPlaceSelect, places, loading, selectedPlace, onBack }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Toggle Button for Mobile/Desktop */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 left-4 z-20 md:hidden bg-white p-2 rounded-md shadow-md"
            >
                {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>

            <div className={`
        absolute md:relative top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'w-full md:w-[400px] translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden'}
      `}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Explore</h2>
                    <SearchBar onSelect={onPlaceSelect} />
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    {/* Place List will go here (Commit 17) */}
                    <div className="text-gray-400 text-sm text-center mt-10">
                        {places?.length > 0 ? `Found ${places.length} places` : "Search or move map to find places"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
