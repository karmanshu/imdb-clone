import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const contributionTypes = [
  {
    title: 'Add New Titles',
    description: 'Help expand IMDb by adding new movies, TV shows, and other titles',
    icon: '🎬',
  },
  {
    title: 'Update Information',
    description: 'Keep IMDb accurate by updating existing title information',
    icon: '📝',
  },
  {
    title: 'Add Cast & Crew',
    description: 'Contribute by adding cast and crew information to titles',
    icon: '👥',
  },
  {
    title: 'Write Reviews',
    description: 'Share your thoughts and help others discover great content',
    icon: '✍️',
  },
];

const guidelines = [
  {
    title: 'Accuracy',
    description: 'Ensure all information is accurate and verifiable',
  },
  {
    title: 'Completeness',
    description: 'Provide as much detail as possible when adding new information',
  },
  {
    title: 'Neutrality',
    description: 'Maintain a neutral point of view in all contributions',
  },
  {
    title: 'Sources',
    description: 'Always cite reliable sources for your contributions',
  },
];

function Contributor() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">IMDb Contributor Zone</h1>
        <p className="text-imdb-gray-400 mt-2">
          Help improve IMDb by contributing your knowledge
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800">
        <div className="flex space-x-8">
          {['overview', 'guidelines', 'tools', 'status'].map((tab) => (
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
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionTypes.map((type) => (
              <motion.div
                key={type.title}
                whileHover={{ scale: 1.02 }}
                className="bg-imdb-gray-800 rounded-imdb p-6"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-medium mb-2">{type.title}</h3>
                <p className="text-imdb-gray-400">{type.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-imdb-gray-800 rounded-imdb p-6">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-imdb-gray-400 mb-6">
              To become an IMDb contributor, you'll need to create an account and
              agree to our contribution guidelines. Once approved, you'll have
              access to our contributor tools and resources.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-imdb-yellow text-imdb-dark px-6 py-3 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
            >
              Become a Contributor
            </motion.button>
          </div>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-imdb-gray-800 rounded-imdb p-6"
            >
              <h3 className="text-xl font-medium mb-2">{guideline.title}</h3>
              <p className="text-imdb-gray-400">{guideline.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="bg-imdb-gray-800 rounded-imdb p-6">
            <h2 className="text-2xl font-bold mb-4">Contributor Tools</h2>
            <p className="text-imdb-gray-400 mb-6">
              Access our suite of tools to help you contribute effectively:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-imdb-gray-700 text-white px-4 py-2 rounded-imdb hover:bg-imdb-gray-600 transition-colors"
              >
                Title Submission Form
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-imdb-gray-700 text-white px-4 py-2 rounded-imdb hover:bg-imdb-gray-600 transition-colors"
              >
                Cast & Crew Editor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-imdb-gray-700 text-white px-4 py-2 rounded-imdb hover:bg-imdb-gray-600 transition-colors"
              >
                Review Submission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-imdb-gray-700 text-white px-4 py-2 rounded-imdb hover:bg-imdb-gray-600 transition-colors"
              >
                Image Uploader
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="bg-imdb-gray-800 rounded-imdb p-6">
            <h2 className="text-2xl font-bold mb-4">Your Contributions</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-imdb-gray-400">Total Contributions</span>
                <span className="text-imdb-yellow">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-imdb-gray-400">Pending Reviews</span>
                <span className="text-imdb-yellow">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-imdb-gray-400">Approval Rate</span>
                <span className="text-imdb-yellow">0%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contributor; 