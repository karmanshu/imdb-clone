import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockAwards = [
  {
    id: 1,
    name: '96th Academy Awards',
    date: '2024-03-10',
    location: 'Dolby Theatre, Hollywood, California',
    host: 'Jimmy Kimmel',
    image: '/images/oscars-2024.jpg',
    categories: [
      { name: 'Best Picture', winner: 'Oppenheimer' },
      { name: 'Best Director', winner: 'Christopher Nolan' },
      { name: 'Best Actor', winner: 'Cillian Murphy' },
      { name: 'Best Actress', winner: 'Emma Stone' },
    ],
  },
  {
    id: 2,
    name: '81st Golden Globe Awards',
    date: '2024-01-07',
    location: 'The Beverly Hilton, Beverly Hills, California',
    host: 'Jo Koy',
    image: '/images/golden-globes-2024.jpg',
    categories: [
      { name: 'Best Motion Picture - Drama', winner: 'Oppenheimer' },
      { name: 'Best Motion Picture - Musical or Comedy', winner: 'Poor Things' },
      { name: 'Best Actor - Drama', winner: 'Cillian Murphy' },
      { name: 'Best Actress - Drama', winner: 'Lily Gladstone' },
    ],
  },
];

const mockEvents = [
  {
    id: 1,
    name: 'Cannes Film Festival 2024',
    date: '2024-05-14',
    location: 'Cannes, France',
    image: '/images/cannes-2024.jpg',
    description: 'The 77th annual Cannes Film Festival will take place from May 14 to May 25, 2024.',
  },
  {
    id: 2,
    name: 'Sundance Film Festival 2024',
    date: '2024-01-18',
    location: 'Park City, Utah',
    image: '/images/sundance-2024.jpg',
    description: 'The 2024 Sundance Film Festival took place from January 18 to January 28, 2024.',
  },
];

function Awards() {
  const [activeTab, setActiveTab] = useState('awards');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Awards & Events</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {['awards', 'events'].map((tab) => (
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
      {activeTab === 'awards' && (
        <div className="space-y-8">
          {mockAwards.map((award) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-imdb-gray-800 rounded-imdb overflow-hidden"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={award.image}
                  alt={award.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imdb-dark to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-2xl font-bold mb-2">{award.name}</h2>
                  <div className="flex items-center gap-4 text-imdb-gray-300">
                    <span>{new Date(award.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{award.location}</span>
                    <span>•</span>
                    <span>Host: {award.host}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Winners</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {award.categories.map((category) => (
                    <div
                      key={category.name}
                      className="bg-imdb-gray-700 rounded-imdb p-4"
                    >
                      <div className="text-imdb-gray-400">{category.name}</div>
                      <div className="text-imdb-yellow font-medium mt-1">
                        {category.winner}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-imdb-gray-800 rounded-imdb overflow-hidden"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-imdb-dark to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                  <div className="flex items-center gap-4 text-imdb-gray-300">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-imdb-gray-300">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Awards; 