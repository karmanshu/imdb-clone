import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import HamburgerMenu from './HamburgerMenu';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-imdb-dark border-b border-imdb-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <HamburgerMenu />
            <Link to="/" className="flex items-center">
              <motion.img
                src="/images/imdb-logo.png"
                alt="IMDb"
                className="text-imdb-yellow font-bold text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search IMDb"
                className="w-full bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-imdb-gray-400 hover:text-imdb-yellow transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
            >
              <UserIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 h-12">
          <Link
            to="/movies"
            className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
          >
            TV Shows
          </Link>
          <Link
            to="/celebs"
            className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
          >
            Celebs
          </Link>
          <Link
            to="/awards"
            className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
          >
            Awards & Events
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 