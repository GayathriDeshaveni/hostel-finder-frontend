import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?city=${search}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Text */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find your perfect{' '}
              <span className="text-blue-600">hostel</span>{' '}
              near campus
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Trusted, fast, and verified hostel listings. Connect with the best
              student accommodation with complete transparency.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="Search by city or college name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 border border-gray-300 px-5 py-3 rounded-lg text-gray-800 outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600 text-sm">500+ Verified Hostels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 text-sm">10,000+ Happy Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-gray-600 text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600"
              alt="Students"
              className="rounded-2xl w-full object-cover h-80 shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Verified Safe</div>
                <div className="text-xs text-gray-500">All hostels verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Boys Hostels', icon: '👨‍🎓', color: 'bg-blue-50 text-blue-700 border-blue-200', gender: 'boys' },
              { label: 'Girls Hostels', icon: '👩‍🎓', color: 'bg-pink-50 text-pink-700 border-pink-200', gender: 'girls' },
              { label: 'Mixed Hostels', icon: '🏠', color: 'bg-green-50 text-green-700 border-green-200', gender: 'mixed' },
              { label: 'With Food', icon: '🍽️', color: 'bg-orange-50 text-orange-700 border-orange-200', gender: '' },
            ].map((cat) => (
              <div
                key={cat.label}
                onClick={() => navigate(`/search?gender=${cat.gender}`)}
                className={`${cat.color} border p-6 rounded-xl text-center cursor-pointer hover:shadow-md transition`}
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-semibold">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why HostelFinder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔍', title: 'Easy Search', desc: 'Find hostels by city or college in seconds' },
              { icon: '✅', title: 'Verified Listings', desc: 'All hostels are manually verified for safety' },
              { icon: '❤️', title: 'Save Favourites', desc: 'Save and compare your favourite hostels easily' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;