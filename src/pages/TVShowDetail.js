import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockTVShow = {
  id: 1,
  title: 'Shōgun',
  year: 2024,
  rating: 9.1,
  duration: '1h',
  genres: ['Action', 'Adventure', 'Drama', 'History'],
  creator: 'Rachel Kondo, Justin Marks',
  cast: [
    { id: 1, name: 'Hiroyuki Sanada', role: 'Lord Yoshii Toranaga', photo: '/images/actors/1.jpg' },
    { id: 2, name: 'Cosmo Jarvis', role: 'John Blackthorne', photo: '/images/actors/2.jpg' },
    { id: 3, name: 'Anna Sawai', role: 'Toda Mariko', photo: '/images/actors/3.jpg' },
    { id: 4, name: 'Tadanobu Asano', role: 'Kashigi Yabushige', photo: '/images/actors/4.jpg' },
  ],
  plot: 'When a mysterious European ship is found marooned in a nearby fishing village, Lord Yoshii Toranaga discovers secrets that could tip the scales of power and devastate his enemies.',
  poster: '/images/shogun.jpg',
  trailer: 'https://www.youtube.com/embed/example',
  seasons: [
    {
      season: 1,
      episodes: 10,
      year: 2024,
      episodesList: [
        { number: 1, title: 'Anjin', airDate: '2024-02-27' },
        { number: 2, title: 'Servants of Two Masters', airDate: '2024-02-27' },
        { number: 3, title: 'Tomorrow is Tomorrow', airDate: '2024-03-05' },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      author: 'TVFan123',
      rating: 9,
      date: '2024-03-01',
      content: 'A masterpiece of historical drama. The attention to detail is stunning, the performances are outstanding, and the story is compelling. A must-watch series.',
      likes: 1245,
    },
  ],
  similarShows: [
    { id: 2, title: 'Game of Thrones', year: 2011, rating: 9.2, poster: '/images/got.jpg' },
    { id: 3, title: 'The Last Kingdom', year: 2015, rating: 8.4, poster: '/images/last-kingdom.jpg' },
    { id: 4, title: 'Vikings', year: 2013, rating: 8.5, poster: '/images/vikings.jpg' },
  ],
};

function TVShowDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
            <img
              src={mockTVShow.poster}
              alt={mockTVShow.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{mockTVShow.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-imdb-yellow font-semibold">{mockTVShow.rating}</span>
            <span className="text-imdb-gray-400">{mockTVShow.year}</span>
            <span className="text-imdb-gray-400">{mockTVShow.duration}</span>
            <span className="text-imdb-gray-400">{mockTVShow.seasons[0].episodes} episodes</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {mockTVShow.genres.map((genre) => (
              <span
                key={genre}
                className="bg-imdb-gray-800 text-imdb-gray-300 px-3 py-1 rounded-imdb text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-imdb-gray-300 mb-4">{mockTVShow.plot}</p>
          <div className="space-y-2">
            <p className="text-imdb-gray-400">
              <span className="font-semibold">Creator:</span> {mockTVShow.creator}
            </p>
            <p className="text-imdb-gray-400">
              <span className="font-semibold">Stars:</span>{' '}
              {mockTVShow.cast.slice(0, 3).map((actor) => actor.name).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {['overview', 'episodes', 'cast', 'reviews', 'details'].map((tab) => (
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Storyline</h2>
            <p className="text-imdb-gray-300">{mockTVShow.plot}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockTVShow.cast.map((actor) => (
                <motion.div
                  key={actor.id}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800 mb-2">
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{actor.name}</h3>
                  <p className="text-imdb-gray-400 text-sm">{actor.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'episodes' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Season 1</h2>
            <div className="space-y-4">
              {mockTVShow.seasons[0].episodesList.map((episode) => (
                <div
                  key={episode.number}
                  className="bg-imdb-gray-800 rounded-imdb p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {episode.number}. {episode.title}
                      </h3>
                      <p className="text-imdb-gray-400">
                        {new Date(episode.airDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-imdb-yellow hover:text-imdb-yellow-dark">
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cast' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockTVShow.cast.map((actor) => (
            <motion.div
              key={actor.id}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800 mb-2">
                <img
                  src={actor.photo}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{actor.name}</h3>
              <p className="text-imdb-gray-400 text-sm">{actor.role}</p>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {mockTVShow.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-imdb-gray-800 rounded-imdb p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">{review.author}</h3>
                  <p className="text-imdb-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-imdb-yellow mr-2">{review.rating}/10</span>
                  <button className="text-imdb-gray-400 hover:text-imdb-yellow">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-imdb-gray-300">{review.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Technical Specs</h2>
            <div className="space-y-2">
              <p className="text-imdb-gray-400">
                <span className="font-semibold">Runtime:</span> {mockTVShow.duration}
              </p>
              <p className="text-imdb-gray-400">
                <span className="font-semibold">Color:</span> Color
              </p>
              <p className="text-imdb-gray-400">
                <span className="font-semibold">Aspect Ratio:</span> 2.39 : 1
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Shows</h2>
            <div className="grid grid-cols-2 gap-4">
              {mockTVShow.similarShows.map((show) => (
                <motion.div
                  key={show.id}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800 mb-2">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{show.title}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-imdb-yellow">{show.rating}</span>
                    <span className="text-imdb-gray-400">{show.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TVShowDetail; 