import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockMovie = {
  id: 1,
  title: 'Dune: Part Two',
  year: 2024,
  rating: 8.8,
  duration: '2h 46m',
  genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
  director: 'Denis Villeneuve',
  cast: [
    { id: 1, name: 'Timothée Chalamet', role: 'Paul Atreides', photo: '/images/actors/1.jpg' },
    { id: 2, name: 'Zendaya', role: 'Chani', photo: '/images/actors/2.jpg' },
    { id: 3, name: 'Rebecca Ferguson', role: 'Lady Jessica', photo: '/images/actors/3.jpg' },
    { id: 4, name: 'Javier Bardem', role: 'Stilgar', photo: '/images/actors/4.jpg' },
  ],
  plot: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
  poster: '/images/dune2.jpg',
  trailer: 'https://www.youtube.com/embed/WarMeVwHBok',
  reviews: [
    {
      id: 1,
      author: 'MovieFan123',
      rating: 9,
      date: '2024-03-01',
      content: 'A masterpiece of science fiction cinema. The visuals are stunning, the performances are outstanding, and the story is compelling. Denis Villeneuve has created something truly special.',
      likes: 1245,
    },
  ],
  similarMovies: [
    { id: 2, title: 'Dune', year: 2021, rating: 8.0, poster: '/images/dune.jpg' },
    { id: 3, title: 'Blade Runner 2049', year: 2017, rating: 8.0, poster: '/images/blade-runner.jpg' },
    { id: 4, title: 'Interstellar', year: 2014, rating: 8.6, poster: '/images/interstellar.jpg' },
  ],
};

function MovieDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/3"
        >
          <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800 shadow-imdb">
            <img
              src={mockMovie.poster}
              alt={mockMovie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-2/3"
        >
          <h1 className="text-4xl font-bold mb-2">{mockMovie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-imdb-yellow font-semibold text-xl">{mockMovie.rating}</span>
            <span className="text-imdb-gray-400">{mockMovie.year}</span>
            <span className="text-imdb-gray-400">{mockMovie.duration}</span>
            <span className="text-imdb-gray-400">PG-13</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {mockMovie.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-imdb-gray-800 rounded-imdb text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-imdb-gray-300 mb-6">{mockMovie.plot}</p>
          <div className="space-y-2 mb-6">
            <div>
              <span className="text-imdb-gray-400">Director: </span>
              <span className="text-imdb-blue hover:underline cursor-pointer">
                {mockMovie.director}
              </span>
            </div>
            <div>
              <span className="text-imdb-gray-400">Writers: </span>
              <span className="text-imdb-blue hover:underline cursor-pointer">
                Jon Spaihts, Denis Villeneuve, Frank Herbert
              </span>
            </div>
            <div>
              <span className="text-imdb-gray-400">Stars: </span>
              {mockMovie.cast.slice(0, 3).map((actor, index) => (
                <React.Fragment key={actor.id}>
                  <span className="text-imdb-blue hover:underline cursor-pointer">
                    {actor.name}
                  </span>
                  {index < 2 && <span>, </span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded-imdb font-medium hover:bg-yellow-500">
              Watch Trailer
            </button>
            <button className="border border-imdb-gray-300 text-white px-6 py-2 rounded-imdb font-medium hover:bg-imdb-gray-800">
              Add to Watchlist
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {['overview', 'cast', 'reviews', 'details'].map((tab) => (
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
      <div className="mb-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Storyline</h2>
              <p className="text-imdb-gray-300 mb-6">{mockMovie.plot}</p>
              
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockMovie.cast.map((actor) => (
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
                    <div className="text-imdb-blue hover:underline cursor-pointer">
                      {actor.name}
                    </div>
                    <div className="text-imdb-gray-400 text-sm">{actor.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-imdb-gray-400">Release date: </span>
                  <span className="text-white">March 1, 2024 (United States)</span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Countries of origin: </span>
                  <span className="text-white">United States, Canada</span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Languages: </span>
                  <span className="text-white">English</span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Also known as: </span>
                  <span className="text-white">Dune: Part Two</span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Filming locations: </span>
                  <span className="text-white">Budapest, Hungary</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockMovie.cast.map((actor) => (
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
                <div className="text-imdb-blue hover:underline cursor-pointer">
                  {actor.name}
                </div>
                <div className="text-imdb-gray-400 text-sm">{actor.role}</div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {mockMovie.reviews.map((review) => (
              <div key={review.id} className="bg-imdb-gray-800 rounded-imdb p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-imdb-yellow font-semibold">
                        {review.author}
                      </span>
                      <span className="text-imdb-gray-400 text-sm">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-imdb-yellow">★</span>
                      <span className="text-imdb-gray-400">{review.rating}/10</span>
                    </div>
                  </div>
                  <button className="text-imdb-gray-400 hover:text-imdb-yellow">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </button>
                </div>
                <p className="text-imdb-gray-300">{review.content}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="text-imdb-gray-400 hover:text-imdb-yellow flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{review.likes}</span>
                  </button>
                  <button className="text-imdb-gray-400 hover:text-imdb-yellow">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Specs</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Runtime</span>
                  <span className="text-white">{mockMovie.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Color</span>
                  <span className="text-white">Color</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Aspect Ratio</span>
                  <span className="text-white">2.39 : 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Camera</span>
                  <span className="text-white">Arri Alexa LF, Arri Alexa Mini LF</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Company Credits</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Production Co</span>
                  <span className="text-white">Legendary Entertainment, Warner Bros.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-imdb-gray-400">Distributor</span>
                  <span className="text-white">Warner Bros. Pictures</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Similar Movies */}
      <section>
        <h2 className="text-2xl font-bold mb-6">More Like This</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockMovie.similarMovies.map((movie) => (
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
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail; 