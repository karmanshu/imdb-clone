import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockWatchlist = [
  {
    id: 1,
    title: 'Dune: Part Two',
    rating: 8.8,
    poster: '/images/dune2.jpg',
    year: 2024,
    addedDate: '2024-02-15',
    folder: 'Sci-Fi',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    rating: 8.9,
    poster: '/images/oppenheimer.jpg',
    year: 2023,
    addedDate: '2024-01-20',
    folder: 'Drama',
  },
  {
    id: 3,
    title: 'Poor Things',
    rating: 8.4,
    poster: '/images/poor-things.jpg',
    year: 2023,
    addedDate: '2024-02-01',
    folder: 'Drama',
  },
];

function Watchlist() {
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const folders = ['All', 'Sci-Fi', 'Drama', 'Action', 'Comedy'];

  const filteredMovies = mockWatchlist.filter(
    (movie) => selectedFolder === 'All' || movie.folder === selectedFolder
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.addedDate) - new Date(a.addedDate);
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Your Watchlist</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-imdb-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-imdb-gray-800 text-white px-3 py-1 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
            >
              <option value="date">Date Added</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <button className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb font-medium hover:bg-yellow-500">
            Create New List
          </button>
        </div>
      </div>

      {/* Folders */}
      <div className="flex flex-wrap gap-2 mb-8">
        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => setSelectedFolder(folder)}
            className={`px-4 py-2 rounded-imdb ${
              selectedFolder === folder
                ? 'bg-imdb-yellow text-imdb-dark'
                : 'bg-imdb-gray-800 text-white hover:bg-imdb-gray-700'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {sortedMovies.length > 0 ? (
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
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2">
                    <button className="text-white hover:text-imdb-yellow">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-imdb-base truncate">{movie.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-imdb-yellow font-semibold">{movie.rating}</span>
                  <span className="text-imdb-gray-400 text-imdb-sm">{movie.year}</span>
                </div>
                <div className="text-imdb-gray-400 text-imdb-xs mt-1">
                  Added {new Date(movie.addedDate).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-imdb-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.318a4.5 4.5 0 00-3.182 7.682L12 20l3.182-3.182a4.5 4.5 0 00-3.182-7.682z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Your Watchlist is Empty</h3>
          <p className="text-imdb-gray-400 mb-4">
            Add movies to your watchlist to keep track of what you want to watch.
          </p>
          <button className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded-imdb font-medium hover:bg-yellow-500">
            Browse Movies
          </button>
        </div>
      )}
    </div>
  );
}

export default Watchlist; 