import React, { useState, useEffect } from 'react';
import { useDiscussion } from '../../context/DiscussionContext';
import { motion } from 'framer-motion';
import Shimmer from '../Shimmer';

const DiscussionThread = ({ thread, onVote, onComment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(!thread.isSpoiler);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-imdb-light dark:bg-imdb-gray-800 rounded-imdb p-4 mb-4 shadow-imdb"
    >
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onVote(1)}
            className="text-imdb-gray-400 hover:text-imdb-yellow"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="text-imdb-gray-300 font-medium">{thread.votes}</span>
          <button
            onClick={() => onVote(-1)}
            className="text-imdb-gray-400 hover:text-imdb-yellow"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{thread.title}</h3>
          {thread.isSpoiler && !showSpoiler ? (
            <button
              onClick={() => setShowSpoiler(true)}
              className="bg-imdb-gray-700 text-imdb-yellow px-3 py-1 rounded-imdb text-sm mb-2"
            >
              Show Spoiler
            </button>
          ) : (
            <p className="text-imdb-gray-300 mb-2">{thread.content}</p>
          )}
          <div className="flex items-center text-sm text-imdb-gray-400">
            <span>Posted by {thread.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(thread.timestamp).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:text-imdb-yellow"
            >
              {thread.comments} comments
            </button>
          </div>
          {isExpanded && (
            <div className="mt-4">
              <textarea
                className="w-full bg-imdb-gray-700 rounded-imdb p-2 text-imdb-gray-300 mb-2"
                placeholder="Add a comment..."
                rows="2"
              />
              <button
                onClick={() => onComment()}
                className="btn-primary text-sm"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DiscussionBoard = ({ movieId }) => {
  const { discussions, loading, error, fetchDiscussions, addThread, addComment, voteThread } = useDiscussion();
  const [newThread, setNewThread] = useState({ title: '', content: '', isSpoiler: false });

  useEffect(() => {
    fetchDiscussions(movieId);
  }, [movieId, fetchDiscussions]);

  const handleSubmitThread = (e) => {
    e.preventDefault();
    const thread = {
      id: Date.now(),
      ...newThread,
      author: 'CurrentUser', // TODO: Replace with actual user
      timestamp: new Date().toISOString(),
      votes: 0,
      comments: 0,
    };
    addThread(movieId, thread);
    setNewThread({ title: '', content: '', isSpoiler: false });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Shimmer className="h-20" count={3} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading discussions: {error}</div>;
  }

  const movieDiscussions = discussions[movieId]?.threads || [];

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmitThread} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={newThread.title}
            onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
            placeholder="Thread title"
            className="w-full bg-imdb-gray-700 rounded-imdb p-2 text-imdb-gray-300 mb-2"
            required
          />
          <textarea
            value={newThread.content}
            onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
            placeholder="Your thoughts..."
            className="w-full bg-imdb-gray-700 rounded-imdb p-2 text-imdb-gray-300 mb-2"
            rows="3"
            required
          />
          <label className="flex items-center text-imdb-gray-300">
            <input
              type="checkbox"
              checked={newThread.isSpoiler}
              onChange={(e) => setNewThread({ ...newThread, isSpoiler: e.target.checked })}
              className="mr-2"
            />
            Contains spoilers
          </label>
        </div>
        <button type="submit" className="btn-primary">
          Create Thread
        </button>
      </form>

      <div className="space-y-4">
        {movieDiscussions.map((thread) => (
          <DiscussionThread
            key={thread.id}
            thread={thread}
            onVote={(vote) => voteThread(movieId, thread.id, vote)}
            onComment={() => addComment(movieId, thread.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscussionBoard; 