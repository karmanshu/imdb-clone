import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const menuItems = [
  {
    title: 'Menu',
    items: [
      { label: 'Home', path: '/' },
      { label: 'Movies', path: '/movies' },
      { label: 'TV Shows', path: '/tv-shows' },
      { label: 'Celebs', path: '/celebs' },
      { label: 'Awards & Events', path: '/awards' },
      { label: 'Watchlist', path: '/watchlist' },
    ],
  },
  {
    title: 'Browse by Genre',
    items: [
      { label: 'Action', path: '/genre/action' },
      { label: 'Adventure', path: '/genre/adventure' },
      { label: 'Animation', path: '/genre/animation' },
      { label: 'Biography', path: '/genre/biography' },
      { label: 'Comedy', path: '/genre/comedy' },
      { label: 'Crime', path: '/genre/crime' },
      { label: 'Documentary', path: '/genre/documentary' },
      { label: 'Drama', path: '/genre/drama' },
      { label: 'Family', path: '/genre/family' },
      { label: 'Fantasy', path: '/genre/fantasy' },
      { label: 'History', path: '/genre/history' },
      { label: 'Horror', path: '/genre/horror' },
      { label: 'Music', path: '/genre/music' },
      { label: 'Mystery', path: '/genre/mystery' },
      { label: 'Romance', path: '/genre/romance' },
      { label: 'Sci-Fi', path: '/genre/sci-fi' },
      { label: 'Sport', path: '/genre/sport' },
      { label: 'Thriller', path: '/genre/thriller' },
      { label: 'War', path: '/genre/war' },
      { label: 'Western', path: '/genre/western' },
    ],
  },
  {
    title: 'Top Rated',
    items: [
      { label: 'Top 250 Movies', path: '/top-rated/movies' },
      { label: 'Top 250 TV Shows', path: '/top-rated/tv-shows' },
      { label: 'Most Popular Movies', path: '/popular/movies' },
      { label: 'Most Popular TV Shows', path: '/popular/tv-shows' },
      { label: 'Top Rated Indian Movies', path: '/top-rated/indian' },
      { label: 'Lowest Rated Movies', path: '/lowest-rated' },
    ],
  },
  {
    title: 'News & Community',
    items: [
      { label: 'News', path: '/news' },
      { label: 'Press Room', path: '/press-room' },
      { label: 'Community', path: '/community' },
      { label: 'Help Center', path: '/help' },
      { label: 'Contributor Zone', path: '/contributor' },
      { label: 'Polls', path: '/polls' },
    ],
  },
];

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-imdb-dark z-50 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-imdb hover:bg-imdb-gray-800 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {menuItems.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-imdb-yellow">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <motion.li
                          key={item.path}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Link
                            to={item.path}
                            className="block py-2 text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-imdb-gray-800">
                <h3 className="text-lg font-semibold text-imdb-yellow mb-4">
                  IMDb Pro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-imdb-gray-800 rounded-imdb p-4"
                  >
                    <h4 className="font-medium mb-2">For Industry Professionals</h4>
                    <p className="text-imdb-gray-400 text-sm mb-4">
                      Get industry insights, contact details, and more
                    </p>
                    <button className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb hover:bg-imdb-yellow-dark transition-colors">
                      Try IMDb Pro
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-imdb-gray-800 rounded-imdb p-4"
                  >
                    <h4 className="font-medium mb-2">For Casting Professionals</h4>
                    <p className="text-imdb-gray-400 text-sm mb-4">
                      Find talent, post jobs, and manage your projects
                    </p>
                    <button className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb hover:bg-imdb-yellow-dark transition-colors">
                      Try IMDb Pro Casting
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HamburgerMenu; 