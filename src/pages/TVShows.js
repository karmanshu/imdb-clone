import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockTVShows = [
  {
    id: 1,
    title: 'Shōgun',
    year: 2024,
    rating: 9.1,
    poster: '/images/shogun.jpg',
    genres: ['Action', 'Adventure', 'Drama', 'History'],
    seasons: 1,
    episodes: 10,
    status: 'Currently Airing',
  },
  {
    id: 2,
    title: 'True Detective',
    year: 2014,
    rating: 8.9,
    poster: '/images/true-detective.jpg',
    genres: ['Crime', 'Drama', 'Mystery', 'Thriller'],
    seasons: 4,
    episodes: 30,
    status: 'Returning Series',
  },
  {
    id: 3,
    title: 'The Bear',
    year: 2022,
    rating: 8.6,
    poster: '/images/the-bear.jpg',
    genres: ['Comedy', 'Drama'],
    seasons: 2,
    episodes: 18,
    status: 'Returning Series',
  },
  {
    id: 4,
    title: 'House of the Dragon',
    year: 2022,
    rating: 8.5,
    poster: '/images/house-of-the-dragon.jpg',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    seasons: 1,
    episodes: 10,
    status: 'Returning Series',
  },
];

const popularShows = [
  {
    id: 5,
    title: 'The Last of Us',
    year: 2023,
    rating: 8.8,
    poster: '/images/last-of-us.jpg',
    genres: ['Action', 'Adventure', 'Drama', 'Horror'],
    seasons: 1,
    episodes: 9,
    status: 'Returning Series',
  },
  {
    id: 6,
    title: 'Succession',
    year: 2018,
    rating: 8.8,
    poster: '/images/succession.jpg',
    genres: ['Drama'],
    seasons: 4,
    episodes: 39,
    status: 'Ended',
  },
];

const newEpisodes = [
  {
    id: 7,
    title: 'The Mandalorian',
    year: 2019,
    rating: 8.7,
    poster: '/images/mandalorian.jpg',
    genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
    seasons: 3,
    episodes: 24,
    status: 'Returning Series',
    newEpisode: 'S3E8 - The Return',
    airDate: '2024-04-19',
  },
  {
    id: 8,
    title: 'The Boys',
    year: 2019,
    rating: 8.7,
    poster: '/images/the-boys.jpg',
    genres: ['Action', 'Comedy', 'Crime', 'Drama'],
    seasons: 3,
    episodes: 24,
    status: 'Returning Series',
    newEpisode: 'S4E1 - Department of Dirty Tricks',
    airDate: '2024-06-13',
  },
];

function TVShows() {
  const [activeTab, setActiveTab] = useState('popular');
  const [sortBy, setSortBy] = useState('rating');

  const tabs = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'new-episodes', label: 'New Episodes' },
    { id: 'coming-soon', label: 'Coming Soon' },
  ];

  const sortedTVShows = [...mockTVShows].sort((a, b) => {
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
        <h1 className="text-3xl font-bold mb-4 md:mb-0">TV Shows</h1>
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

      {/* Featured Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTVShows.slice(0, 2).map((show) => (
            <motion.div
              key={show.id}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <Link to={`/tv-show/${show.id}`}>
                <div className="aspect-[16/9] rounded-imdb overflow-hidden bg-imdb-gray-800">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-imdb-dark to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold mb-2">{show.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-imdb-yellow font-semibold">{show.rating}</span>
                      <span className="text-imdb-gray-400">{show.year}</span>
                      <span className="text-imdb-gray-400">{show.seasons} seasons</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {show.genres.map((genre) => (
                        <span
                          key={genre}
                          className="text-imdb-gray-400 text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TV Shows Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Rated TV Shows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sortedTVShows.map((show) => (
            <motion.div
              key={show.id}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link to={`/tv-show/${show.id}`}>
                <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-white text-sm">{show.status}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-imdb-base truncate">{show.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-imdb-yellow font-semibold">{show.rating}</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">{show.year}</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">•</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">{show.seasons} seasons</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {show.genres.map((genre) => (
                      <span
                        key={genre}
                        className="text-imdb-gray-400 text-imdb-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Shows */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Shows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularShows.map((show) => (
            <motion.div
              key={show.id}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link to={`/tv-show/${show.id}`}>
                <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-white text-sm">{show.status}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-imdb-base truncate">{show.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-imdb-yellow font-semibold">{show.rating}</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">{show.year}</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">•</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">{show.seasons} seasons</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {show.genres.map((genre) => (
                      <span
                        key={genre}
                        className="text-imdb-gray-400 text-imdb-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Episodes */}
      <div>
        <h2 className="text-2xl font-bold mb-6">New Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newEpisodes.map((show) => (
            <motion.div
              key={show.id}
              whileHover={{ scale: 1.02 }}
              className="bg-imdb-gray-800 rounded-imdb overflow-hidden"
            >
              <Link to={`/tv-show/${show.id}`} className="flex">
                <div className="w-1/3">
                  <div className="aspect-[2/3]">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="font-medium text-lg mb-2">{show.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-imdb-yellow font-semibold">{show.rating}</span>
                    <span className="text-imdb-gray-400">{show.year}</span>
                    <span className="text-imdb-gray-400">•</span>
                    <span className="text-imdb-gray-400">{show.seasons} seasons</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-imdb-gray-400">New Episode:</span>
                    <p className="text-imdb-yellow">{show.newEpisode}</p>
                    <p className="text-imdb-gray-400">
                      Airs: {new Date(show.airDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {show.genres.map((genre) => (
                      <span
                        key={genre}
                        className="text-imdb-gray-400 text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TVShows; 