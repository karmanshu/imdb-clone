import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieApi } from '../context/MovieApiContext';
import { Link } from 'react-router-dom';

function ActorDetails() {
  const { id } = useParams();
  const { fetchMovieDetails, getImageUrl } = useMovieApi();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadActorDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setActor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActorDetails();
  }, [id, fetchMovieDetails]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-imdb-gray-800 rounded-imdb w-1/4 mb-4" />
          <div className="h-4 bg-imdb-gray-800 rounded-imdb w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-96 bg-imdb-gray-800 rounded-imdb" />
            <div className="md:col-span-2 space-y-4">
              <div className="h-4 bg-imdb-gray-800 rounded-imdb w-3/4" />
              <div className="h-4 bg-imdb-gray-800 rounded-imdb w-1/2" />
              <div className="h-4 bg-imdb-gray-800 rounded-imdb w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-imdb">
          {error}
        </div>
      </div>
    );
  }

  if (!actor) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Actor Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
      >
        <div className="relative">
          <img
            src={getImageUrl(actor.profile_path, 'w500')}
            alt={actor.name}
            className="w-full rounded-imdb shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-imdb-gray-400">
              {actor.birthday && new Date(actor.birthday).toLocaleDateString()}
            </span>
            {actor.deathday && (
              <span className="text-imdb-gray-400">
                - {new Date(actor.deathday).toLocaleDateString()}
              </span>
            )}
            <span className="text-imdb-gray-400">{actor.place_of_birth}</span>
          </div>
          <p className="text-imdb-gray-300 mb-4">{actor.biography}</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 ${
              activeTab === 'overview'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`pb-4 ${
              activeTab === 'movies'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`pb-4 ${
              activeTab === 'tv'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            TV Shows
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-imdb-gray-300">{actor.biography}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Known For</h3>
                  <p className="text-imdb-gray-300">{actor.known_for_department}</p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Birthday</h3>
                  <p className="text-imdb-gray-300">
                    {actor.birthday && new Date(actor.birthday).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Place of Birth</h3>
                  <p className="text-imdb-gray-300">{actor.place_of_birth}</p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Also Known As</h3>
                  <p className="text-imdb-gray-300">
                    {actor.also_known_as?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {actor.movie_credits.cast
              .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
              .map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link to={`/movie/${movie.id}`}>
                    <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                      <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-imdb-base truncate">{movie.title}</h3>
                      <p className="text-imdb-gray-400 text-sm truncate">
                        {movie.character}
                      </p>
                      <p className="text-imdb-gray-400 text-sm">
                        {movie.release_date?.split('-')[0]}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'tv' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {actor.tv_credits.cast
              .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
              .map((show) => (
                <motion.div
                  key={show.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link to={`/tv/${show.id}`}>
                    <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                      <img
                        src={getImageUrl(show.poster_path, 'w500')}
                        alt={show.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-imdb-base truncate">{show.name}</h3>
                      <p className="text-imdb-gray-400 text-sm truncate">
                        {show.character}
                      </p>
                      <p className="text-imdb-gray-400 text-sm">
                        {show.first_air_date?.split('-')[0]}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ActorDetails; 