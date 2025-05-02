import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockPopular = {
  movies: [
    {
      id: 1,
      title: 'Dune: Part Two',
      year: 2024,
      rating: 8.8,
      poster: '/images/dune2.jpg',
      genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
      trending: 'up',
      change: '+2',
    },
    {
      id: 2,
      title: 'Oppenheimer',
      year: 2023,
      rating: 8.9,
      poster: '/images/oppenheimer.jpg',
      genres: ['Biography', 'Drama', 'History'],
      trending: 'down',
      change: '-1',
    },
    {
      id: 3,
      title: 'Poor Things',
      year: 2023,
      rating: 8.4,
      poster: '/images/poor-things.jpg',
      genres: ['Comedy', 'Drama', 'Romance', 'Sci-Fi'],
      trending: 'up',
      change: '+5',
    },
    {
      id: 4,
      title: 'The Zone of Interest',
      year: 2023,
      rating: 8.3,
      poster: '/images/zone-of-interest.jpg',
      genres: ['Drama', 'History', 'War'],
      trending: 'up',
      change: '+3',
    },
  ],
  tvShows: [
    {
      id: 1,
      title: 'Shōgun',
      year: 2024,
      rating: 9.1,
      poster: '/images/shogun.jpg',
      genres: ['Action', 'Adventure', 'Drama', 'History'],
      trending: 'up',
      change: '+4',
    },
    {
      id: 2,
      title: 'True Detective',
      year: 2014,
      rating: 8.9,
      poster: '/images/true-detective.jpg',
      genres: ['Crime', 'Drama', 'Mystery', 'Thriller'],
      trending: 'up',
      change: '+1',
    },
    {
      id: 3,
      title: 'The Bear',
      year: 2022,
      rating: 8.6,
      poster: '/images/the-bear.jpg',
      genres: ['Comedy', 'Drama'],
      trending: 'down',
      change: '-2',
    },
    {
      id: 4,
      title: 'House of the Dragon',
      year: 2022,
      rating: 8.5,
      poster: '/images/house-of-dragon.jpg',
      genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
      trending: 'up',
      change: '+3',
    },
  ],
};

function Popular() {
  const { type } = useParams();
  const [sortBy, setSortBy] = useState('trending');
  const [activeTab, setActiveTab] = useState(type || 'movies');

  const items = mockPopular[activeTab] || [];
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'trending') {
      return parseInt(b.change) - parseInt(a.change);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return b.year - a.year;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Most Popular {activeTab === 'movies' ? 'Movies' : 'TV Shows'}
          </h1>
          <p className="text-imdb-gray-400 mt-2">
            What's trending on IMDb this week
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
          >
            <option value="trending">Sort by Trending</option>
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800">
        <div className="flex space-x-8">
          {['movies', 'tvShows'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab === 'tvShows' ? 'TV Shows' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link
              to={`/${activeTab === 'movies' ? 'movie' : 'tv-show'}/${item.id}`}
            >
              <div className="relative">
                <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div
                  className={`absolute top-2 right-2 px-2 py-1 rounded-imdb text-sm font-medium ${
                    item.trending === 'up'
                      ? 'bg-green-900 text-green-400'
                      : 'bg-red-900 text-red-400'
                  }`}
                >
                  {item.trending === 'up' ? '↑' : '↓'} {item.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium group-hover:text-imdb-yellow transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-imdb-yellow">{item.rating}</span>
                  <span className="text-imdb-gray-400">{item.year}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-imdb-gray-800 text-imdb-gray-300 px-2 py-1 rounded-imdb text-xs"
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

      {/* Related Lists */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More Popular Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Top Rated Movies',
            'Top Rated TV Shows',
            'Most Popular by Genre',
            'Most Popular by Year',
            'Most Popular Indian Movies',
            'Most Popular Indian TV Shows',
          ].map((list) => (
            <motion.div
              key={list}
              whileHover={{ scale: 1.02 }}
              className="bg-imdb-gray-800 rounded-imdb p-4"
            >
              <Link
                to={`/popular/${list.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
              >
                {list}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popular; 