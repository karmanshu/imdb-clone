import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieApi } from '../context/MovieApiContext';
import DiscussionBoard from '../components/discussion/DiscussionBoard';
import Shimmer from '../components/Shimmer';

const MovieDetails = () => {
  const { id } = useParams();
  const { fetchMovieDetails, getImageUrl, loading, error } = useMovieApi();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Error loading movie details:', err);
      }
    };

    loadMovieDetails();
  }, [id, fetchMovieDetails]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Shimmer className="h-[450px] w-full" />
          <div className="md:col-span-2 space-y-4">
            <Shimmer className="h-8 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
            <Shimmer className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-red-500">Error loading movie details: {error}</div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="relative">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-auto rounded-imdb shadow-imdb-lg"
          />
          {movie.vote_average && (
            <div className="absolute top-4 right-4 bg-imdb-yellow text-imdb-dark px-3 py-1 rounded-imdb font-bold">
              {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>

        {/* Movie Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center space-x-4 text-imdb-gray-400 mb-4">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
            <span>•</span>
            <span>{movie.genres?.map(genre => genre.name).join(', ')}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-imdb-gray-300">{movie.overview}</p>
          </div>

          {movie.credits?.cast && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 4).map(actor => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={getImageUrl(actor.profile_path, 'w185')}
                      alt={actor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                    />
                    <p className="text-sm font-medium">{actor.name}</p>
                    <p className="text-xs text-imdb-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {movie.videos?.results && movie.videos.results.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-imdb"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discussion Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Discussions</h2>
        <DiscussionBoard movieId={id} />
      </section>
    </div>
  );
};

export default MovieDetails; 