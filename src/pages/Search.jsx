import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HostelCard from '../components/HostelCard';
import API_URL from '../config';

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(params.get('city') || '');
  const [filters, setFilters] = useState({
    gender: params.get('gender') || '',
    minPrice: '',
    maxPrice: '',
    wifi: false,
    food: false,
    ac: false,
    laundry: false,
  });

  const fetchHostels = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) {
        query.append('city', search);
        query.append('college', search);
      }
      if (filters.gender) query.append('gender', filters.gender);
      if (filters.minPrice) query.append('minPrice', filters.minPrice);
      if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
      if (filters.wifi) query.append('wifi', 'true');
      if (filters.food) query.append('food', 'true');
      if (filters.ac) query.append('ac', 'true');
      if (filters.laundry) query.append('laundry', 'true');

      const res = await axios.get(`${API_URL}/api/hostels?${query}`);
      setHostels(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [search, filters]);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by city or college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
        />
        <button
          onClick={fetchHostels}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Search
        </button>
      </div>

      <div className="flex gap-6">

        {/* Filters Sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Filters</h3>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Gender</label>
              {['', 'boys', 'girls', 'mixed'].map((g) => (
                <label key={g} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={filters.gender === g}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  />
                  <span className="text-gray-600 capitalize">{g === '' ? 'All' : g}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Price Range (₹/month)</label>
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-2 outline-none"
              />
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none"
              />
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Amenities</label>
              {[
                { key: 'wifi', label: '📶 WiFi' },
                { key: 'food', label: '🍽️ Food' },
                { key: 'ac', label: '❄️ AC' },
                { key: 'laundry', label: '👕 Laundry' },
              ].map((a) => (
                <label key={a.key} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[a.key]}
                    onChange={(e) => setFilters({ ...filters, [a.key]: e.target.checked })}
                  />
                  <span className="text-gray-600">{a.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={fetchHostels}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading hostels...</div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🏠</div>
              <p className="text-gray-500 text-lg">No hostels found. Try a different search!</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">{hostels.length} hostels found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostels.map((hostel) => (
                  <HostelCard key={hostel._id} hostel={hostel} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;