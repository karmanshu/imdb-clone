import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for demonstration
const trendingMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    rating: 8.8,
    poster: '/images/dune2.jpg',
    year: 2024,
  },
  {
    id: 2,
    title: 'Oppenheimer',
    rating: 8.9,
    poster: '/images/oppenheimer.jpg',
    year: 2023,
  },
  {
    id: 3,
    title: 'Poor Things',
    rating: 8.4,
    poster: '/images/poor-things.jpg',
    year: 2023,
  },
  {
    id: 4,
    title: 'The Holdovers',
    rating: 8.0,
    poster: '/images/the-holdovers.jpg',
    year: 2023,
  },
];

const topRatedMovies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    rating: 9.3,
    poster: '/images/shawshank.jpg',
    year: 1994,
  },
  {
    id: 2,
    title: 'The Godfather',
    rating: 9.2,
    poster: '/images/godfather.jpg',
    year: 1972,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    rating: 9.0,
    poster: '/images/dark-knight.jpg',
    year: 2008,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    rating: 8.9,
    poster: '/images/pulp-fiction.jpg',
    year: 1994,
  },
];

const MovieCard = ({ movie }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative group"
  >
    <Link to={`/movie/${movie.id}`}>
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
    </Link>
  </motion.div>
);

const MovieSection = ({ title, movies }) => (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link to="/movies" className="text-imdb-blue hover:underline">
        See all
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
);

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative h-[60vh] rounded-imdb overflow-hidden">
          <img
            src="/images/dune2-hero.jpg"
            alt="Dune: Part Two"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-imdb-dark to-transparent">
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Dune: Part Two</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-imdb-yellow font-semibold text-xl">8.8</span>
                <span className="text-imdb-gray-300">2024</span>
                <span className="text-imdb-gray-300">2h 46m</span>
              </div>
              <p className="text-imdb-gray-300 max-w-2xl mb-4">
                Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
              </p>
              <div className="flex space-x-4">
                <button className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded-imdb font-medium hover:bg-yellow-500">
                  Watch Trailer
                </button>
                <button className="border border-imdb-gray-300 text-white px-6 py-2 rounded-imdb font-medium hover:bg-imdb-gray-800">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <MovieSection title="Trending Movies" movies={trendingMovies} />

      {/* Top Rated Movies */}
      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />

      {/* News Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-imdb-gray-800 rounded-imdb overflow-hidden">
            <img
              src="/images/news1.jpg"
              alt="Oscar Nominations"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">2024 Oscar Nominations Announced</h3>
              <p className="text-imdb-gray-400 text-sm">
                See the full list of nominees for the 96th Academy Awards.
              </p>
            </div>
          </div>
          <div className="bg-imdb-gray-800 rounded-imdb overflow-hidden">
            <img
              src="/images/news2.jpg"
              alt="Dune Premiere"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">Dune: Part Two World Premiere</h3>
              <p className="text-imdb-gray-400 text-sm">
                The cast and crew celebrate the highly anticipated sequel.
              </p>
            </div>
          </div>
          <div className="bg-imdb-gray-800 rounded-imdb overflow-hidden">
            <img
              src="/images/news3.jpg"
              alt="New Releases"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">February 2024 Movie Releases</h3>
              <p className="text-imdb-gray-400 text-sm">
                Check out the most anticipated movies coming this month.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 