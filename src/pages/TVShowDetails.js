import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieApi } from '../context/MovieApiContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

function TVShowDetails() {
  const { id } = useParams();
  const { fetchMovieDetails, getImageUrl } = useMovieApi();
  const { user, addToWatchlist, removeFromWatchlist } = useUser();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadShowDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShowDetails();
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

  if (!show) {
    return null;
  }

  const isInWatchlist = user?.watchlist?.includes(show.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Show Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
      >
        <div className="relative">
          <img
            src={getImageUrl(show.poster_path, 'w500')}
            alt={show.name}
            className="w-full rounded-imdb shadow-lg"
          />
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(show.id);
                } else {
                  addToWatchlist(show.id);
                }
              }}
              className="absolute top-4 right-4 bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </motion.button>
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-imdb-yellow font-semibold">{show.vote_average.toFixed(1)}</span>
            <span className="text-imdb-gray-400">{show.first_air_date.split('-')[0]}</span>
            <span className="text-imdb-gray-400">{show.number_of_seasons} Seasons</span>
          </div>
          <p className="text-imdb-gray-300 mb-4">{show.overview}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {show.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-imdb-gray-800 text-imdb-gray-300 px-3 py-1 rounded-imdb text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
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
            onClick={() => setActiveTab('cast')}
            className={`pb-4 ${
              activeTab === 'cast'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Cast
          </button>
          <button
            onClick={() => setActiveTab('episodes')}
            className={`pb-4 ${
              activeTab === 'episodes'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Episodes
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
              <h2 className="text-2xl font-bold mb-4">Storyline</h2>
              <p className="text-imdb-gray-300">{show.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Status</h3>
                  <p className="text-imdb-gray-300">{show.status}</p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Network</h3>
                  <p className="text-imdb-gray-300">
                    {show.networks.map((network) => network.name).join(', ')}
                  </p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">First Air Date</h3>
                  <p className="text-imdb-gray-300">{show.first_air_date}</p>
                </div>
                <div>
                  <h3 className="text-imdb-gray-400 mb-2">Last Air Date</h3>
                  <p className="text-imdb-gray-300">{show.last_air_date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {show.credits.cast.slice(0, 12).map((actor) => (
              <motion.div
                key={actor.id}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link to={`/actor/${actor.id}`}>
                  <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                    <img
                      src={getImageUrl(actor.profile_path, 'w500')}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-imdb-base truncate">{actor.name}</h3>
                    <p className="text-imdb-gray-400 text-sm truncate">{actor.character}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'episodes' && (
          <div className="space-y-6">
            {show.seasons.map((season) => (
              <div key={season.id} className="bg-imdb-gray-800 rounded-imdb p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{season.name}</h2>
                  <span className="text-imdb-gray-400">{season.episode_count} Episodes</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {season.episodes?.map((episode) => (
                    <motion.div
                      key={episode.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-imdb-gray-700 rounded-imdb overflow-hidden"
                    >
                      <div className="aspect-video bg-imdb-gray-800">
                        <img
                          src={getImageUrl(episode.still_path, 'w500')}
                          alt={episode.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{episode.name}</h3>
                        <p className="text-imdb-gray-400 text-sm">
                          Episode {episode.episode_number} • {episode.air_date}
                        </p>
                        <p className="text-imdb-gray-300 text-sm mt-2 line-clamp-2">
                          {episode.overview}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default TVShowDetails; 