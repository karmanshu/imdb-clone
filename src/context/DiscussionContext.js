import React, { createContext, useContext, useState, useCallback } from 'react';

const DiscussionContext = createContext();

export const DiscussionProvider = ({ children }) => {
  const [discussions, setDiscussions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDiscussions = useCallback(async (movieId) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockDiscussions = {
        threads: [
          {
            id: 1,
            title: 'What did you think about the ending?',
            content: 'The ending was unexpected but satisfying.',
            author: 'MovieFan123',
            timestamp: new Date().toISOString(),
            votes: 42,
            comments: 15,
            isSpoiler: true,
          },
          {
            id: 2,
            title: 'Best performance in the movie?',
            content: 'The lead actor was phenomenal!',
            author: 'CinemaLover',
            timestamp: new Date().toISOString(),
            votes: 28,
            comments: 8,
            isSpoiler: false,
          },
        ],
      };
      setDiscussions(prev => ({
        ...prev,
        [movieId]: mockDiscussions,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addThread = useCallback((movieId, thread) => {
    setDiscussions(prev => ({
      ...prev,
      [movieId]: {
        ...prev[movieId],
        threads: [thread, ...(prev[movieId]?.threads || [])],
      },
    }));
  }, []);

  const addComment = useCallback((movieId, threadId, comment) => {
    setDiscussions(prev => ({
      ...prev,
      [movieId]: {
        ...prev[movieId],
        threads: prev[movieId].threads.map(thread =>
          thread.id === threadId
            ? { ...thread, comments: thread.comments + 1 }
            : thread
        ),
      },
    }));
  }, []);

  const voteThread = useCallback((movieId, threadId, vote) => {
    setDiscussions(prev => ({
      ...prev,
      [movieId]: {
        ...prev[movieId],
        threads: prev[movieId].threads.map(thread =>
          thread.id === threadId
            ? { ...thread, votes: thread.votes + vote }
            : thread
        ),
      },
    }));
  }, []);

  return (
    <DiscussionContext.Provider
      value={{
        discussions,
        loading,
        error,
        fetchDiscussions,
        addThread,
        addComment,
        voteThread,
      }}
    >
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = () => {
  const context = useContext(DiscussionContext);
  if (!context) {
    throw new Error('useDiscussion must be used within a DiscussionProvider');
  }
  return context;
}; 