import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import TVShowDetail from './pages/TVShowDetail';
import ActorDetail from './pages/ActorDetail';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Celebs from './pages/Celebs';
import Awards from './pages/Awards';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-imdb-dark text-white">
        <Header />
        <main>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 