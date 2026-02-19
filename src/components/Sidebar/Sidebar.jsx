import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "@/components/Search/SearchBar";
import PlacesList from "@/components/Sidebar/PlacesList";
import FilterBar from "@/components/Sidebar/FilterBar";
import RatingFilter from "@/components/Sidebar/RatingFilter";
import SortDropdown from "@/components/Sidebar/SortDropdown";
import PlaceDetailsModal from "@/components/PlaceDetails/PlaceDetailsModal";
import FavoritesPanel from "@/components/Sidebar/FavoritesPanel";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";

const Sidebar = ({
    onPlaceSelect,
    places,
    loading,
    selectedPlace,
    onBack,
    type,
    onTypeChange,
    rating,
    onRatingChange,
    sortOption,
    onSortChange,
    onGetDirections,
    route,
    onClearRoute,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showFavorites, setShowFavorites] = useState(false);

    if (selectedPlace) {
        return (
            <div
                className={`
          absolute md:relative top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "w-full md:w-[400px] translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden"}
        `}
            >
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

            <div
                className={`
        absolute md:relative top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? "w-full md:w-[400px] translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden"}
      `}
            >
                {showFavorites && (
                    <FavoritesPanel onPlaceSelect={onPlaceSelect} onBack={() => setShowFavorites(false)} />
                )}

                <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Explore</h2>
                        <button
                            onClick={() => setShowFavorites(true)}
                            className="text-pink-500 hover:text-pink-600 p-2 rounded-full hover:bg-pink-50 transition"
                            title="View Favorites"
                        >
                            <FaHeart size={20} />
                        </button>
                    </div>
                    <SearchBar onSelect={onPlaceSelect} />
                    <FilterBar type={type} onTypeChange={onTypeChange} />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <RatingFilter rating={rating} onRatingChange={onRatingChange} />
                        </div>
                        <div className="flex-1">
                            <SortDropdown
                                sortOption={sortOption}
                                onSortChange={onSortChange}
                            />
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

Sidebar.propTypes = {
    onPlaceSelect: PropTypes.func.isRequired,
    places: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    selectedPlace: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    rating: PropTypes.number.isRequired,
    onRatingChange: PropTypes.func.isRequired,
    sortOption: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onGetDirections: PropTypes.func.isRequired,
    route: PropTypes.object,
    onClearRoute: PropTypes.func.isRequired,
};

export default Sidebar;
