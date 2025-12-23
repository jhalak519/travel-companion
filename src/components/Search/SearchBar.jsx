import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        // onSearch will be hooked up later or debounced
    };

    return (
        <div className="relative w-full z-10">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search destination..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-gray-800 bg-white"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
};

export default SearchBar;
