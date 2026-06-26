import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const defaultImages = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
];

const HostelCard = ({ hostel, onFavouriteChange }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleFavourite = async (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    try {
      await axios.post(
        `http://localhost:5000/api/favourites/${hostel._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onFavouriteChange) onFavouriteChange();
    } catch (err) {
      console.error(err);
    }
  };

  const imageUrl = hostel.images && hostel.images[0]
    ? hostel.images[0]
    : defaultImages[hostel._id.charCodeAt(hostel._id.length - 1) % defaultImages.length];

  const rating = hostel.rating ? hostel.rating.toFixed(1) : null;

  return (
    <div
      onClick={() => navigate(`/hostel/${hostel._id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
        {/* Rating Badge */}
        {rating && (
  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
    <span className="text-yellow-400 text-sm">⭐</span>
    <span className="text-sm font-semibold text-gray-800">{rating}</span>
  </div>
)}
        {/* Favourite Button */}
        <button
          onClick={handleFavourite}
          className="absolute top-3 left-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:text-red-500 transition"
        >
          ❤️
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800">{hostel.name}</h3>
          <div>
            <span className="text-xl font-bold text-blue-600">₹{hostel.price}</span>
            <span className="text-gray-400 text-xs">/month</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-2">📍 {hostel.city}</p>
        {hostel.nearbyCollege && (
          <p className="text-gray-500 text-sm mb-2">🎓 Near {hostel.nearbyCollege}</p>
        )}

        {/* Gender Badge */}
        <span className={`text-xs px-2 py-1 rounded-full font-medium
          ${hostel.gender === 'boys' ? 'bg-blue-100 text-blue-700' :
            hostel.gender === 'girls' ? 'bg-pink-100 text-pink-700' :
            'bg-green-100 text-green-700'}`}>
          {hostel.gender === 'boys' ? '👨‍🎓 Boys' :
           hostel.gender === 'girls' ? '👩‍🎓 Girls' : '🏠 Mixed'}
        </span>

        {/* Amenities */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {hostel.amenities?.wifi && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📶 WiFi</span>}
          {hostel.amenities?.food && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">🍽️ Food</span>}
          {hostel.amenities?.ac && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">❄️ AC</span>}
          {hostel.amenities?.laundry && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">👕 Laundry</span>}
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/hostel/${hostel._id}`); }}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HostelCard;