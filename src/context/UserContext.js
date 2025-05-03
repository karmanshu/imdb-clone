import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '/images/default-avatar.png',
        watchlist: [],
        favorites: [],
        reviews: [],
      };
      setUser(mockUser);
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const updatedUser = {
        ...user,
        ...profileData,
      };
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (movieId) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      watchlist: [...prev.watchlist, movieId],
    }));
  };

  const removeFromWatchlist = (movieId) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(id => id !== movieId),
    }));
  };

  const addToFavorites = (movieId) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      favorites: [...prev.favorites, movieId],
    }));
  };

  const removeFromFavorites = (movieId) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== movieId),
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        addToWatchlist,
        removeFromWatchlist,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 