import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useMovieApi } from '../context/MovieApiContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, updateProfile, logout } = useUser();
  const { getImageUrl } = useMovieApi();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          <Link
            to="/login"
            className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-8"
      >
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
            onError={(e) => {
              e.target.src = '/images/default-avatar.png';
            }}
          />
          {isEditing && (
            <input
              type="text"
              value={profileData.avatar}
              onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
              placeholder="Avatar URL"
              className="mt-2 w-full bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
            />
          )}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
              />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-imdb-gray-300 text-white px-4 py-2 rounded-imdb font-medium hover:bg-imdb-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-imdb-gray-400 mb-4">{user.email}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="border border-imdb-gray-300 text-white px-4 py-2 rounded-imdb font-medium hover:bg-imdb-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`pb-4 ${
              activeTab === 'watchlist'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Watchlist
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 ${
              activeTab === 'favorites'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 ${
              activeTab === 'reviews'
                ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                : 'text-imdb-gray-400 hover:text-imdb-yellow'
            }`}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'watchlist' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {user.watchlist.length > 0 ? (
              user.watchlist.map((movieId) => (
                <motion.div
                  key={movieId}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link to={`/movie/${movieId}`}>
                    <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                      <img
                        src={getImageUrl(`/movie/${movieId}/poster`)}
                        alt="Movie poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-imdb-gray-400">Your watchlist is empty</p>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {user.favorites.length > 0 ? (
              user.favorites.map((movieId) => (
                <motion.div
                  key={movieId}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link to={`/movie/${movieId}`}>
                    <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                      <img
                        src={getImageUrl(`/movie/${movieId}/poster`)}
                        alt="Movie poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-imdb-gray-400">Your favorites list is empty</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-imdb-gray-800 rounded-imdb p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      to={`/movie/${review.movieId}`}
                      className="text-xl font-semibold hover:text-imdb-yellow transition-colors"
                    >
                      {review.movieTitle}
                    </Link>
                    <div className="flex items-center space-x-2">
                      <span className="text-imdb-yellow">{review.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-imdb-gray-300">{review.content}</p>
                  <div className="mt-4 text-sm text-imdb-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-imdb-gray-400">You haven't written any reviews yet</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Profile; 