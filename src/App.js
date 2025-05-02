import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Celebs from './pages/Celebs';
import Awards from './pages/Awards';
import MovieDetail from './pages/MovieDetail';
import TVShowDetail from './pages/TVShowDetail';
import ActorDetail from './pages/ActorDetail';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import Genre from './pages/Genre';
import TopRated from './pages/TopRated';
import Popular from './pages/Popular';
import News from './pages/News';
import Community from './pages/Community';
import Help from './pages/Help';
import Contributor from './pages/Contributor';
import Polls from './pages/Polls';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-imdb-dark text-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/celebs" element={<Celebs />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/tv-show/:id" element={<TVShowDetail />} />
              <Route path="/actor/:id" element={<ActorDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/genre/:genre" element={<Genre />} />
              <Route path="/top-rated/:type" element={<TopRated />} />
              <Route path="/popular/:type" element={<Popular />} />
              <Route path="/news" element={<News />} />
              <Route path="/community" element={<Community />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contributor" element={<Contributor />} />
              <Route path="/polls" element={<Polls />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 