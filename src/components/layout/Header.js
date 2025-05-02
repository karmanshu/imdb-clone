import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-imdb-dark text-white">
      {/* Top Bar */}
      <div className="bg-imdb-gray-900 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-imdb-yellow font-bold text-xl">IMDb</Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/movies" className="text-sm hover:text-imdb-yellow">Movies</Link>
              <Link to="/tv" className="text-sm hover:text-imdb-yellow">TV Shows</Link>
              <Link to="/celebs" className="text-sm hover:text-imdb-yellow">Celebs</Link>
              <Link to="/awards" className="text-sm hover:text-imdb-yellow">Awards & Events</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm hover:text-imdb-yellow">Sign In</button>
            <button className="bg-imdb-yellow text-imdb-dark px-4 py-1 rounded-imdb text-sm font-medium hover:bg-yellow-500">
              IMDbPro
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-imdb-dark py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-6">
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/" className="flex items-center">
                <img src="/images/imdb-logo.png" alt="IMDb" className="h-8" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search IMDb"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-imdb-dark px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-imdb-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Watchlist */}
            <div className="flex items-center space-x-4">
              <Link to="/watchlist" className="flex items-center space-x-1 hover:text-imdb-yellow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden md:inline">Watchlist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-imdb-gray-800 py-4"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <Link to="/movies" className="text-white hover:text-imdb-yellow">Movies</Link>
              <Link to="/tv" className="text-white hover:text-imdb-yellow">TV Shows</Link>
              <Link to="/celebs" className="text-white hover:text-imdb-yellow">Celebs</Link>
              <Link to="/awards" className="text-white hover:text-imdb-yellow">Awards & Events</Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header; 