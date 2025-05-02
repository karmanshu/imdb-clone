import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockCelebs = [
  {
    id: 1,
    name: 'Timothée Chalamet',
    photo: '/images/actors/1.jpg',
    knownFor: ['Dune: Part Two', 'Call Me by Your Name', 'Wonka'],
    birthDate: '1995-12-27',
  },
  {
    id: 2,
    name: 'Zendaya',
    photo: '/images/actors/2.jpg',
    knownFor: ['Dune: Part Two', 'Spider-Man: No Way Home', 'Euphoria'],
    birthDate: '1996-09-01',
  },
  {
    id: 3,
    name: 'Cillian Murphy',
    photo: '/images/actors/3.jpg',
    knownFor: ['Oppenheimer', 'Peaky Blinders', 'Inception'],
    birthDate: '1976-05-25',
  },
  {
    id: 4,
    name: 'Emma Stone',
    photo: '/images/actors/4.jpg',
    knownFor: ['Poor Things', 'La La Land', 'The Favourite'],
    birthDate: '1988-11-06',
  },
];

function Celebs() {
  const [activeTab, setActiveTab] = useState('popular');
  const [sortBy, setSortBy] = useState('name');

  const tabs = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'born-today', label: 'Born Today' },
    { id: 'news', label: 'News' },
    { id: 'photos', label: 'Photos' },
  ];

  const sortedCelebs = [...mockCelebs].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return new Date(b.birthDate) - new Date(a.birthDate);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Celebs</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-imdb-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-imdb-gray-800 text-white px-3 py-1 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
            >
              <option value="name">Name</option>
              <option value="birthDate">Birth Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 ${
                activeTab === tab.id
                  ? 'text-imdb-yellow border-b-2 border-imdb-yellow'
                  : 'text-imdb-gray-400 hover:text-imdb-yellow'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Celebs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortedCelebs.map((celeb) => (
          <motion.div
            key={celeb.id}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
              <img
                src={celeb.photo}
                alt={celeb.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-imdb-base truncate">{celeb.name}</h3>
              <div className="space-y-1">
                <div className="text-imdb-gray-400 text-imdb-sm">
                  {new Date().getFullYear() - new Date(celeb.birthDate).getFullYear()} years old
                </div>
                <div className="text-imdb-gray-400 text-imdb-xs">
                  Known for:
                </div>
                <div className="flex flex-wrap gap-1">
                  {celeb.knownFor.map((movie, index) => (
                    <span
                      key={index}
                      className="text-imdb-gray-400 text-imdb-xs"
                    >
                      {movie}
                      {index < celeb.knownFor.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Celebs; 