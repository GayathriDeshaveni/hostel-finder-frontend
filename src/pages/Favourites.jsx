import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import HostelCard from '../components/HostelCard';
import API_URL from '../config';

const Favourites = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/favourites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavourites(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchFavourites();
  }, [user, navigate, fetchFavourites]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">❤️ My Favourites</h1>

      {favourites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">❤️</div>
          <p className="text-gray-500 text-lg">No favourites yet!</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Find Hostels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favourites.map((hostel) => (
            <HostelCard
              key={hostel._id}
              hostel={hostel}
              onFavouriteChange={fetchFavourites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;