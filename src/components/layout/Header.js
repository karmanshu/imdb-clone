import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, UserIcon, BookmarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../context/UserContext';
import HamburgerMenu from './HamburgerMenu';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const languageRef = useRef(null);
  const { user, logout } = useUser();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
  ];

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
          <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl mx-4">
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

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Watchlist */}
            <Link
              to="/watchlist"
              className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <BookmarkIcon className="w-6 h-6" />
                {user?.watchlist?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-imdb-yellow text-imdb-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {user.watchlist.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
                aria-label="Select language"
              >
                <GlobeAltIcon className="w-6 h-6" />
              </motion.button>

              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-imdb-gray-800 rounded-imdb shadow-lg py-2 z-50 max-h-96 overflow-y-auto"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full text-left px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                      onClick={() => {
                        // Handle language change
                        setIsLanguageOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
                aria-label="User menu"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-avatar.png';
                    }}
                  />
                ) : (
                  <UserIcon className="w-6 h-6" />
                )}
              </motion.button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-imdb-gray-800 rounded-imdb shadow-lg py-2 z-50"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-imdb-gray-700">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-imdb-gray-400">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/watchlist"
                        className="block px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Watchlist
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-imdb-gray-300 hover:bg-imdb-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8 py-4">
          <Link
            to="/movies"
            className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/tv"
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