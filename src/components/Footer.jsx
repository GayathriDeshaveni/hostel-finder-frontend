import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3">🏠 HostelFinder</h2>
            <p className="text-sm leading-relaxed">
              Helping students find safe, affordable, and verified hostels near their college.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Search Hostels</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          {/* Hostel Types */}
          <div>
            <h3 className="text-white font-semibold mb-3">Hostel Types</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search?gender=boys" className="hover:text-white transition">Boys Hostels</Link></li>
              <li><Link to="/search?gender=girls" className="hover:text-white transition">Girls Hostels</Link></li>
              <li><Link to="/search?gender=mixed" className="hover:text-white transition">Mixed Hostels</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 support@hostelfinder.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 HostelFinder. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for students by the HostelFinder team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;