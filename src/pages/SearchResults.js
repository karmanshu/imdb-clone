import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockSearchResults = {
  movies: [
    {
      id: 1,
      title: 'Dune: Part Two',
      year: 2024,
      rating: 8.8,
      poster: '/images/dune2.jpg',
    },
    {
      id: 2,
      title: 'Dune',
      year: 2021,
      rating: 8.0,
      poster: '/images/dune.jpg',
    },
  ],
  actors: [
    {
      id: 1,
      name: 'Timothée Chalamet',
      knownFor: ['Dune', 'Call Me by Your Name'],
      photo: '/images/actors/1.jpg',
    },
    {
      id: 2,
      name: 'Zendaya',
      knownFor: ['Dune', 'Spider-Man: No Way Home'],
      photo: '/images/actors/2.jpg',
    },
  ],
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('movies');
  const [results, setResults] = useState(mockSearchResults);

  useEffect(() => {
    // In a real app, this would fetch results from an API
    // For now, we'll just filter the mock data
    if (query) {
      const filteredResults = {
        movies: mockSearchResults.movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ),
        actors: mockSearchResults.actors.filter((actor) =>
          actor.name.toLowerCase().includes(query.toLowerCase())
        ),
      };
      setResults(filteredResults);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{query}"
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('movies')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'movies'
              ? 'bg-imdb-yellow text-imdb-dark'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Movies ({results.movies.length})
        </button>
        <button
          onClick={() => setActiveTab('actors')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'actors'
              ? 'bg-imdb-yellow text-imdb-dark'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Actors ({results.actors.length})
        </button>
      </div>

      {/* Results */}
      {activeTab === 'movies' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-imdb-yellow">★</span>
                    <span className="ml-1">{movie.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {movie.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.actors.map((actor) => (
            <motion.div
              key={actor.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <img
                src={actor.photo}
                alt={actor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-xl">{actor.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Known for: {actor.knownFor.join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results */}
      {((activeTab === 'movies' && results.movies.length === 0) ||
        (activeTab === 'actors' && results.actors.length === 0)) && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or browse our catalog.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults; 