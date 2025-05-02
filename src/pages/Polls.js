import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const activePolls = [
  {
    id: 1,
    question: 'Which Best Picture nominee deserves to win?',
    options: [
      { text: 'Oppenheimer', votes: 45, percentage: 45 },
      { text: 'Poor Things', votes: 25, percentage: 25 },
      { text: 'Killers of the Flower Moon', votes: 20, percentage: 20 },
      { text: 'The Zone of Interest', votes: 10, percentage: 10 },
    ],
    totalVotes: 100,
    endDate: '2024-03-10',
    category: 'Awards',
  },
  {
    id: 2,
    question: 'Best Performance in a Leading Role?',
    options: [
      { text: 'Cillian Murphy - Oppenheimer', votes: 40, percentage: 40 },
      { text: 'Paul Giamatti - The Holdovers', votes: 30, percentage: 30 },
      { text: 'Bradley Cooper - Maestro', votes: 20, percentage: 20 },
      { text: 'Colman Domingo - Rustin', votes: 10, percentage: 10 },
    ],
    totalVotes: 100,
    endDate: '2024-03-10',
    category: 'Awards',
  },
];

const pastPolls = [
  {
    id: 3,
    question: 'Favorite Movie of 2023?',
    options: [
      { text: 'Oppenheimer', votes: 35, percentage: 35 },
      { text: 'Barbie', votes: 25, percentage: 25 },
      { text: 'Killers of the Flower Moon', votes: 20, percentage: 20 },
      { text: 'Poor Things', votes: 20, percentage: 20 },
    ],
    totalVotes: 100,
    endDate: '2024-01-31',
    category: 'Movies',
  },
  {
    id: 4,
    question: 'Best TV Show of 2023?',
    options: [
      { text: 'Succession', votes: 40, percentage: 40 },
      { text: 'The Last of Us', votes: 30, percentage: 30 },
      { text: 'The Bear', votes: 20, percentage: 20 },
      { text: 'Beef', votes: 10, percentage: 10 },
    ],
    totalVotes: 100,
    endDate: '2024-01-31',
    category: 'TV Shows',
  },
];

function Polls() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedPoll, setSelectedPoll] = useState(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">IMDb Polls</h1>
        <p className="text-imdb-gray-400 mt-2">
          Vote in our polls and see what others think
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800">
        <div className="flex space-x-8">
          {['active', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab} Polls
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(activeTab === 'active' ? activePolls : pastPolls).map((poll) => (
          <motion.div
            key={poll.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-imdb-gray-800 rounded-imdb p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="bg-imdb-gray-700 text-imdb-gray-300 px-2 py-1 rounded-imdb text-xs">
                {poll.category}
              </span>
              <span className="text-imdb-gray-400 text-sm">
                {activeTab === 'active'
                  ? `Ends ${new Date(poll.endDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })}`
                  : `Ended ${new Date(poll.endDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })}`}
              </span>
            </div>
            <h3 className="text-xl font-medium mb-4">{poll.question}</h3>
            <div className="space-y-4">
              {poll.options.map((option) => (
                <div key={option.text}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-imdb-gray-300">{option.text}</span>
                    <span className="text-imdb-yellow">{option.percentage}%</span>
                  </div>
                  <div className="h-2 bg-imdb-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-imdb-yellow"
                      style={{ width: `${option.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-imdb-gray-400 text-sm">
              <span>{poll.totalVotes} votes</span>
              {activeTab === 'active' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-imdb-yellow text-imdb-dark px-4 py-2 rounded-imdb text-sm font-medium hover:bg-imdb-yellow-dark transition-colors"
                >
                  Vote Now
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create New Poll */}
      {activeTab === 'active' && (
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-imdb-yellow text-imdb-dark px-6 py-3 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
          >
            Create New Poll
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Polls; 