import React, { createContext, useContext, useState, useCallback } from 'react';

const MovieApiContext = createContext();

export const MovieApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieCache, setMovieCache] = useState({});

  const fetchMovieDetails = useCallback(async (movieId) => {
    if (movieCache[movieId]) {
      return movieCache[movieId];
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=credits,videos,images`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      
      // Cache the result
      setMovieCache(prev => ({
        ...prev,
        [movieId]: data
      }));

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [movieCache]);

  const searchMovies = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }

      const data = await response.json();
      return data.results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getImageUrl = useCallback((path, size = 'original') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
  }, []);

  return (
    <MovieApiContext.Provider
      value={{
        loading,
        error,
        fetchMovieDetails,
        searchMovies,
        getImageUrl,
        movieCache
      }}
    >
      {children}
    </MovieApiContext.Provider>
  );
};

export const useMovieApi = () => {
  const context = useContext(MovieApiContext);
  if (!context) {
    throw new Error('useMovieApi must be used within a MovieApiProvider');
  }
  return context;
}; 