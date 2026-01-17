import React from 'react';
import { FaTimes, FaMapMarkedAlt, FaHeart, FaGithub } from 'react-icons/fa';

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4 text-pink-500">
                        <FaMapMarkedAlt className="text-5xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">TravelCompanion</h2>
                    <p className="text-pink-500 font-medium mb-6">Your Personal Journey Planner</p>

                    <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-8">
                        <p>
                            Welcome to <strong>TravelCompanion</strong>, an interactive map-based application designed to help you discover the best places around you.
                        </p>
                        <p>
                            Whether you're looking for top-rated <strong>restaurants</strong>, cozy <strong>hotels</strong>, or exciting <strong>attractions</strong>, our real-time search engine powers your exploration with up-to-date data.
                        </p>
                        <p>
                            Save your favorite spots, get directions, and filter by rating to curate your perfect trip. Built with modern web technologies for a smooth and responsive experience.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            Made with <FaHeart className="text-pink-500" /> by Jhalak
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
