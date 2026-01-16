import React, { useState } from 'react';
import SearchBar from '../Search/SearchBar';
import PlacesList from './PlacesList';
import FilterBar from './FilterBar';
import RatingFilter from './RatingFilter';
import SortDropdown from './SortDropdown';
import PlaceDetailsModal from '../PlaceDetails/PlaceDetailsModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ onPlaceSelect, places, loading, selectedPlace, onBack, type, onTypeChange, rating, onRatingChange, sortOption, onSortChange, onGetDirections, route, onClearRoute }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (selectedPlace) {
        return (
            <div className={`
          absolute md:relative top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'w-full md:w-[400px] translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden'}
        `}>
                <PlaceDetailsModal
                    place={selectedPlace}
                    onBack={onBack}
                    onGetDirections={onGetDirections}
                    route={route}
                    onClearRoute={onClearRoute}
                />

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-4 -right-10 z-20 md:hidden bg-white p-2 rounded-md shadow-md text-gray-700"
                >
                    {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 left-4 z-20 md:hidden bg-white p-2 rounded-md shadow-md text-gray-700"
            >
                {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>

            <div className={`
        absolute md:relative top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'w-full md:w-[400px] translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden'}
      `}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Explore</h2>
                    <SearchBar onSelect={onPlaceSelect} />
                    <FilterBar type={type} onTypeChange={onTypeChange} />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <RatingFilter rating={rating} onRatingChange={onRatingChange} />
                        </div>
                        <div className="flex-1">
                            <SortDropdown sortOption={sortOption} onSortChange={onSortChange} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <PlacesList
                        places={places}
                        loading={loading}
                        selectedPlace={selectedPlace}
                        onPlaceSelect={onPlaceSelect}
                    />

                    {!loading && places?.length === 0 && (
                        <div className="text-gray-400 text-sm text-center mt-10">
                            Search or move map to find places
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
