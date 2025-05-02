import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockDiscussions = [
  {
    id: 1,
    title: 'What are your thoughts on Dune: Part Two?',
    author: 'MovieBuff123',
    date: '2024-03-08',
    replies: 245,
    views: 1200,
    lastReply: {
      author: 'SciFiFan',
      date: '2024-03-09',
    },
    tags: ['Dune', 'Sci-Fi', 'Movies'],
  },
  {
    id: 2,
    title: 'Oscars 2024: Best Picture Predictions',
    author: 'AwardsExpert',
    date: '2024-03-07',
    replies: 189,
    views: 950,
    lastReply: {
      author: 'FilmCritic',
      date: '2024-03-08',
    },
    tags: ['Oscars', 'Awards', 'Predictions'],
  },
  {
    id: 3,
    title: 'Favorite TV Shows of 2024 So Far',
    author: 'TVLover',
    date: '2024-03-06',
    replies: 156,
    views: 800,
    lastReply: {
      author: 'SeriesFan',
      date: '2024-03-07',
    },
    tags: ['TV Shows', '2024', 'Discussion'],
  },
  {
    id: 4,
    title: 'Underrated Movies That Deserve More Attention',
    author: 'HiddenGems',
    date: '2024-03-05',
    replies: 98,
    views: 600,
    lastReply: {
      author: 'MovieExplorer',
      date: '2024-03-06',
    },
    tags: ['Movies', 'Underrated', 'Recommendations'],
  },
];

const mockPolls = [
  {
    id: 1,
    question: 'Which Best Picture nominee deserves to win?',
    options: [
      { text: 'Oppenheimer', votes: 45 },
      { text: 'Poor Things', votes: 25 },
      { text: 'Killers of the Flower Moon', votes: 20 },
      { text: 'The Zone of Interest', votes: 10 },
    ],
    totalVotes: 100,
    endDate: '2024-03-10',
  },
  {
    id: 2,
    question: 'Best Performance in a Leading Role?',
    options: [
      { text: 'Cillian Murphy - Oppenheimer', votes: 40 },
      { text: 'Paul Giamatti - The Holdovers', votes: 30 },
      { text: 'Bradley Cooper - Maestro', votes: 20 },
      { text: 'Colman Domingo - Rustin', votes: 10 },
    ],
    totalVotes: 100,
    endDate: '2024-03-10',
  },
];

function Community() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [sortBy, setSortBy] = useState('recent');

  const sortedDiscussions = [...mockDiscussions].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">IMDb Community</h1>
          <p className="text-imdb-gray-400 mt-2">
            Join the conversation with fellow movie and TV enthusiasts
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
          >
            <option value="recent">Sort by Recent</option>
            <option value="popular">Sort by Popular</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800">
        <div className="flex space-x-8">
          {['discussions', 'polls', 'reviews', 'lists'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          {sortedDiscussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ x: 5 }}
              className="bg-imdb-gray-800 rounded-imdb p-6"
            >
              <Link to={`/community/discussion/${discussion.id}`}>
                <h3 className="text-xl font-medium mb-2 hover:text-imdb-yellow transition-colors">
                  {discussion.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-imdb-gray-700 text-imdb-gray-300 px-2 py-1 rounded-imdb text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-imdb-gray-400 text-sm">
                  <div className="flex items-center space-x-4">
                    <span>Posted by {discussion.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(discussion.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{discussion.replies} replies</span>
                    <span>•</span>
                    <span>{discussion.views} views</span>
                    <span>•</span>
                    <span>
                      Last reply by {discussion.lastReply.author} on{' '}
                      {new Date(discussion.lastReply.date).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'polls' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPolls.map((poll) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-imdb-gray-800 rounded-imdb p-6"
            >
              <h3 className="text-xl font-medium mb-4">{poll.question}</h3>
              <div className="space-y-4">
                {poll.options.map((option) => (
                  <div key={option.text}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-imdb-gray-300">{option.text}</span>
                      <span className="text-imdb-yellow">
                        {((option.votes / poll.totalVotes) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-imdb-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-imdb-yellow"
                        style={{
                          width: `${(option.votes / poll.totalVotes) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-imdb-gray-400 text-sm">
                <span>{poll.totalVotes} votes</span>
                <span>
                  Ends{' '}
                  {new Date(poll.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create New */}
      <div className="mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-imdb-yellow text-imdb-dark px-6 py-3 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
        >
          Start a New {activeTab === 'discussions' ? 'Discussion' : 'Poll'}
        </motion.button>
      </div>
    </div>
  );
}

export default Community; 