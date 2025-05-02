import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

function Genre() {
  const { genre } = useParams();
  const [sortBy, setSortBy] = useState('rating');
  const [activeTab, setActiveTab] = useState('movies');

  const sortedMovies = [...mockMovies].sort((a, b) => {
    if (sortBy === 'rating') {
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
          <h1 className="text-3xl font-bold capitalize">{genre} Movies</h1>
          <p className="text-imdb-gray-400 mt-2">
            Explore the best {genre.toLowerCase()} movies of all time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
          >
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800">
        <div className="flex space-x-8">
          {['movies', 'tv shows', 'celebs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedMovies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-medium group-hover:text-imdb-yellow transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-imdb-yellow">{movie.rating}</span>
                  <span className="text-imdb-gray-400">{movie.year}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.genres.map((genre) => (
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

      {/* Related Genres */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Action', 'Adventure', 'Drama', 'Thriller', 'Mystery', 'Crime'].map(
            (relatedGenre) => (
              <motion.div
                key={relatedGenre}
                whileHover={{ scale: 1.05 }}
                className="bg-imdb-gray-800 rounded-imdb p-4 text-center"
              >
                <Link
                  to={`/genre/${relatedGenre.toLowerCase()}`}
                  className="text-imdb-gray-300 hover:text-imdb-yellow transition-colors"
                >
                  {relatedGenre}
                </Link>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Genre; 