import React from 'react';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaPhone, FaGlobe, FaClock, FaDirections } from 'react-icons/fa';
import ReviewsList from './ReviewsList';
import DirectionsPanel from './DirectionsPanel';

const PlaceDetailsModal = ({ place, onBack, onGetDirections, route, onClearRoute }) => {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="relative h-64 flex-shrink-0">
                {place.photo ? (
                    <img src={place.photo.images.large?.url || place.photo.images.medium?.url} alt={place.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                )}
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md text-gray-700 hover:text-blue-600 transition-colors"
                >
                    <FaArrowLeft />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
                    <button
                        onClick={onGetDirections}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center shadow hover:bg-blue-700 transition"
                    >
                        <FaDirections className="mr-1" />
                        Directions
                    </button>
                </div>

                <div className="flex items-center mt-2 flex-wrap gap-4">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 text-lg" />
                        <span className="text-lg font-bold ml-1 text-gray-800">{place.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({place.num_reviews} reviews)</span>
                    </div>
                    <span className="text-gray-600 font-medium">{place.price_level}</span>
                </div>

                {/* Directions Panel if route exists */}
                {route && (
                    <DirectionsPanel route={route} onClose={onClearRoute} />
                )}

                <div className="mt-6 space-y-3">
                    {place.address && (
                        <div className="flex items-start text-gray-600">
                            <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                            <span>{place.address}</span>
                        </div>
                    )}
                    {place.phone && (
                        <div className="flex items-center text-gray-600">
                            <FaPhone className="mr-3 flex-shrink-0" />
                            <span>{place.phone}</span>
                        </div>
                    )}
                    {place.website && (
                        <div className="flex items-center text-blue-600">
                            <FaGlobe className="mr-3 flex-shrink-0" />
                            <a href={place.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                                Website
                            </a>
                        </div>
                    )}
                </div>

                {place.description && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{place.description}</p>
                    </div>
                )}

                {place.cuisine && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Cuisine</h3>
                        <div className="flex flex-wrap gap-2">
                            {place.cuisine.map((tag, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <ReviewsList reviews={place.reviews} />
            </div>
        </div>
    );
};

export default PlaceDetailsModal;
