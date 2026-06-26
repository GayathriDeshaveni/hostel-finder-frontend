import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

const HostelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favMsg, setFavMsg] = useState('');

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/hostels/${id}`);
        setHostel(res.data);
      } catch (err) {
        console.error("Error fetching hostel:", err.message);
      }
      setLoading(false);
    };
    fetchHostel();
  }, [id]);

  const handleFavourite = async () => {
    if (!user) { 
      navigate('/login'); 
      return; 
    }
    try {
      await axios.post(
        `${API_URL}/api/favourites/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavMsg('Added to favourites! ❤️');
      setTimeout(() => setFavMsg(''), 3000);
    } catch (err) {
      console.error("Error saving favourite:", err.message);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!hostel) return <div className="text-center py-20 text-gray-500">Hostel not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back to results
      </button>

      {/* Image */}
      <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center mb-6 overflow-hidden">
        {hostel.images && hostel.images[0] ? (
          <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-8xl">🏠</span>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{hostel.name}</h1>
          <p className="text-gray-500 mt-1">📍 {hostel.address}, {hostel.city}</p>
          {hostel.nearbyCollege && (
            <p className="text-gray-500">🎓 Near {hostel.nearbyCollege}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">₹{hostel.price}</div>
          <div className="text-gray-400 text-sm">per month</div>
        </div>
      </div>

      {/* Gender Badge */}
      <span className={`text-sm px-3 py-1 rounded-full font-medium
        ${hostel.gender === 'boys' ? 'bg-blue-100 text-blue-700' :
          hostel.gender === 'girls' ? 'bg-pink-100 text-pink-700' :
          'bg-green-100 text-green-700'}`}>
        {hostel.gender === 'boys' ? '👨‍🎓 Boys Hostel' :
         hostel.gender === 'girls' ? '👩‍🎓 Girls Hostel' : '🏠 Mixed Hostel'}
      </span>

      {/* Amenities */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'wifi', label: 'WiFi', icon: '📶' },
            { key: 'food', label: 'Food', icon: '🍽️' },
            { key: 'ac', label: 'AC', icon: '❄️' },
            { key: 'laundry', label: 'Laundry', icon: '👕' },
          ].map((a) => {
            const isAvailable = !!hostel.amenities?.[a.key];
            return (
              <div key={a.key} className={`p-4 rounded-xl text-center border
                ${isAvailable
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <div className="text-sm font-medium">{a.label}</div>
                <div className="text-xs">{isAvailable ? 'Available' : 'Not Available'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6 bg-blue-50 rounded-xl p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-700 text-lg">📞 {hostel.contactNumber}</p>
      </div>

      {/* Buttons */}
      {favMsg && (
        <div className="mt-4 bg-green-50 text-green-600 px-4 py-3 rounded-lg">
          {favMsg}
        </div>
      )}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleFavourite}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
        >
          ❤️ Save to Favourites
        </button>
        
        <a
          href={`tel:${hostel.contactNumber}`}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
        >
          📞 Call Now
        </a>
      </div>
    </div>
  );
};

export default HostelDetail;
