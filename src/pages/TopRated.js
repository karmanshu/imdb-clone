import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockTopRated = {
  movies: [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.3,
      poster: '/images/shawshank.jpg',
      genres: ['Drama'],
      rank: 1,
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      rating: 9.2,
      poster: '/images/godfather.jpg',
      genres: ['Crime', 'Drama'],
      rank: 2,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
      poster: '/images/dark-knight.jpg',
      genres: ['Action', 'Crime', 'Drama'],
      rank: 3,
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      year: 1994,
      rating: 8.9,
      poster: '/images/pulp-fiction.jpg',
      genres: ['Crime', 'Drama'],
      rank: 4,
    },
  ],
  tvShows: [
    {
      id: 1,
      title: 'Breaking Bad',
      year: 2008,
      rating: 9.5,
      poster: '/images/breaking-bad.jpg',
      genres: ['Crime', 'Drama', 'Thriller'],
      rank: 1,
    },
    {
      id: 2,
      title: 'Planet Earth II',
      year: 2016,
      rating: 9.4,
      poster: '/images/planet-earth.jpg',
      genres: ['Documentary'],
      rank: 2,
    },
    {
      id: 3,
      title: 'Band of Brothers',
      year: 2001,
      rating: 9.4,
      poster: '/images/band-of-brothers.jpg',
      genres: ['Action', 'Drama', 'History', 'War'],
      rank: 3,
    },
    {
      id: 4,
      title: 'Chernobyl',
      year: 2019,
      rating: 9.3,
      poster: '/images/chernobyl.jpg',
      genres: ['Drama', 'History', 'Thriller'],
      rank: 4,
    },
  ],
};

function TopRated() {
  const { type } = useParams();
  const [sortBy, setSortBy] = useState('rank');
  const [activeTab, setActiveTab] = useState(type || 'movies');

  const items = mockTopRated[activeTab] || [];
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'rank') {
      return a.rank - b.rank;
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
            Top Rated {activeTab === 'movies' ? 'Movies' : 'TV Shows'}
          </h1>
          <p className="text-imdb-gray-400 mt-2">
            IMDb's top rated {activeTab === 'movies' ? 'movies' : 'TV shows'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
          >
            <option value="rank">Sort by Rank</option>
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
      <div className="space-y-6">
        {sortedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 10 }}
            className="flex items-start gap-6 bg-imdb-gray-800 rounded-imdb p-4"
          >
            <div className="text-4xl font-bold text-imdb-yellow w-12 text-center">
              {item.rank}
            </div>
            <Link
              to={`/${activeTab === 'movies' ? 'movie' : 'tv-show'}/${item.id}`}
              className="flex-1 flex items-start gap-4"
            >
              <div className="w-24 flex-shrink-0">
                <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-700">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium hover:text-imdb-yellow transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-imdb-yellow">{item.rating}</span>
                  <span className="text-imdb-gray-400">{item.year}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-imdb-gray-700 text-imdb-gray-300 px-2 py-1 rounded-imdb text-xs"
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
        <h2 className="text-2xl font-bold mb-6">More Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Most Popular Movies',
            'Most Popular TV Shows',
            'Top Rated Indian Movies',
            'Lowest Rated Movies',
            'Top Rated by Genre',
            'Top Rated by Year',
          ].map((list) => (
            <motion.div
              key={list}
              whileHover={{ scale: 1.02 }}
              className="bg-imdb-gray-800 rounded-imdb p-4"
            >
              <Link
                to={`/top-rated/${list.toLowerCase().replace(/\s+/g, '-')}`}
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

export default TopRated; 