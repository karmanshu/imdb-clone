import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How do I create an IMDb account?',
    answer: 'To create an IMDb account, click on the "Sign In" button in the top right corner and select "Create a New Account". Follow the prompts to set up your account with your email address and password.',
  },
  {
    question: 'How do I rate movies and TV shows?',
    answer: 'You can rate movies and TV shows by visiting their detail pages and clicking on the star rating system. You can rate from 1 to 10 stars.',
  },
  {
    question: 'How do I add titles to my watchlist?',
    answer: 'To add titles to your watchlist, visit the movie or TV show detail page and click the "Add to Watchlist" button. You can access your watchlist from your account menu.',
  },
  {
    question: 'How do I contribute to IMDb?',
    answer: 'You can contribute to IMDb by joining the Contributor Zone. Visit the Contributor page to learn more about how you can help improve IMDb.',
  },
];

const supportTopics = [
  {
    title: 'Account & Profile',
    description: 'Manage your account settings and profile information',
    icon: '👤',
  },
  {
    title: 'Watchlist & Ratings',
    description: 'Learn how to manage your watchlist and ratings',
    icon: '⭐',
  },
  {
    title: 'Technical Support',
    description: 'Get help with technical issues and troubleshooting',
    icon: '🔧',
  },
  {
    title: 'Contributor Help',
    description: 'Guidance for IMDb contributors',
    icon: '✍️',
  },
];

function Help() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">IMDb Help Center</h1>
        <p className="text-imdb-gray-400 mt-2">
          Find answers to common questions and get support
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full bg-imdb-gray-800 text-white px-4 py-3 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-imdb-gray-400 hover:text-imdb-yellow transition-colors">
          🔍
        </button>
      </div>

      {/* Support Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportTopics.map((topic) => (
          <motion.div
            key={topic.title}
            whileHover={{ scale: 1.02 }}
            className="bg-imdb-gray-800 rounded-imdb p-6"
          >
            <div className="text-4xl mb-4">{topic.icon}</div>
            <h3 className="text-xl font-medium mb-2">{topic.title}</h3>
            <p className="text-imdb-gray-400">{topic.description}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-imdb-gray-800 rounded-imdb overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-imdb-gray-700 transition-colors"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-imdb-yellow">
                  {activeFaq === index ? '−' : '+'}
                </span>
              </button>
              {activeFaq === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-imdb-gray-400">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-imdb-gray-800 rounded-imdb p-6">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-imdb-gray-400 mb-6">
          Our support team is here to help you with any questions or issues you
          may have.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-imdb-yellow text-imdb-dark px-6 py-3 rounded-imdb font-medium hover:bg-imdb-yellow-dark transition-colors"
        >
          Contact Support
        </motion.button>
      </div>
    </div>
  );
}

export default Help; 