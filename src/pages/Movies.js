import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: 2024,
    rating: 8.8,
    poster: '/images/dune2.jpg',
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
  },
  {
    id: 2,
    title: 'Oppenheimer',
    year: 2023,
    rating: 8.9,
    poster: '/images/oppenheimer.jpg',
    genres: ['Biography', 'Drama', 'History'],
  },
  {
    id: 3,
    title: 'Poor Things',
    year: 2023,
    rating: 8.4,
    poster: '/images/poor-things.jpg',
    genres: ['Comedy', 'Drama', 'Romance', 'Sci-Fi'],
  },
  {
    id: 4,
    title: 'The Zone of Interest',
    year: 2023,
    rating: 8.3,
    poster: '/images/zone-of-interest.jpg',
    genres: ['Drama', 'History', 'War'],
  },
];

function Movies() {
  const [activeTab, setActiveTab] = useState('popular');
  const [sortBy, setSortBy] = useState('rating');

  const tabs = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'coming-soon', label: 'Coming Soon' },
    { id: 'box-office', label: 'Box Office' },
  ];

  const sortedMovies = [...mockMovies].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return b.year - a.year;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Movies</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-imdb-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-imdb-gray-800 text-white px-3 py-1 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
            >
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 ${
                activeTab === tab.id
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortedMovies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-imdb-base truncate">{movie.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-imdb-yellow font-semibold">{movie.rating}</span>
                <span className="text-imdb-gray-400 text-imdb-sm">{movie.year}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-imdb-gray-400 text-imdb-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Movies; 