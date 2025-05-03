import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DiscussionProvider } from './context/DiscussionContext';
import { MovieApiProvider } from './context/MovieApiContext';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Celebs from './pages/Celebs';
import Awards from './pages/Awards';
import MovieDetails from './pages/MovieDetails';
import TVShowDetails from './pages/TVShowDetails';
import ActorDetails from './pages/ActorDetails';
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
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MovieApiProvider>
          <DiscussionProvider>
            <Router>
              <div className="min-h-screen bg-imdb-light dark:bg-imdb-dark text-imdb-gray-900 dark:text-imdb-gray-100 transition-colors duration-300">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv" element={<TVShows />} />
                    <Route path="/celebs" element={<Celebs />} />
                    <Route path="/awards" element={<Awards />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/tv/:id" element={<TVShowDetails />} />
                    <Route path="/actor/:id" element={<ActorDetails />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/genre/:genre" element={<Genre />} />
                    <Route path="/top-rated/:type" element={<TopRated />} />
                    <Route path="/popular/:type" element={<Popular />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/contributor" element={<Contributor />} />
                    <Route path="/polls" element={<Polls />} />
                  </Routes>
                </main>
                <Footer />
                <ThemeToggle />
              </div>
            </Router>
          </DiscussionProvider>
        </MovieApiProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App; 