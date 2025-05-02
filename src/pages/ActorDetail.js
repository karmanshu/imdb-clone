import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockActor = {
  id: 1,
  name: 'Timothée Chalamet',
  photo: '/images/actors/1.jpg',
  birthDate: '1995-12-27',
  birthPlace: 'New York City, New York, USA',
  height: '5\' 10" (1.78 m)',
  biography: 'Timothée Hal Chalamet is an American actor. He has received various accolades, including nominations for an Academy Award, three Golden Globe Awards, and three British Academy Film Awards. Time magazine named him one of the 100 most influential people in the world in 2022.',
  filmography: [
    {
      id: 1,
      title: 'Dune: Part Two',
      year: 2024,
      role: 'Paul Atreides',
      poster: '/images/dune2.jpg',
    },
    {
      id: 2,
      title: 'Dune',
      year: 2021,
      role: 'Paul Atreides',
      poster: '/images/dune.jpg',
    },
    {
      id: 3,
      title: 'Call Me by Your Name',
      year: 2017,
      role: 'Elio Perlman',
      poster: '/images/call-me-by-your-name.jpg',
    },
    {
      id: 4,
      title: 'Little Women',
      year: 2019,
      role: 'Theodore "Laurie" Laurence',
      poster: '/images/little-women.jpg',
    },
  ],
  awards: [
    {
      id: 1,
      year: 2018,
      award: 'Academy Award',
      category: 'Best Actor',
      movie: 'Call Me by Your Name',
      result: 'Nominated',
    },
    {
      id: 2,
      year: 2018,
      award: 'BAFTA Award',
      category: 'Best Actor in a Leading Role',
      movie: 'Call Me by Your Name',
      result: 'Nominated',
    },
    {
      id: 3,
      year: 2018,
      award: 'Golden Globe',
      category: 'Best Actor - Motion Picture Drama',
      movie: 'Call Me by Your Name',
      result: 'Nominated',
    },
  ],
};

function ActorDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Actor Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/3"
        >
          <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800 shadow-imdb">
            <img
              src={mockActor.photo}
              alt={mockActor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-2/3"
        >
          <h1 className="text-4xl font-bold mb-2">{mockActor.name}</h1>
          <div className="space-y-2 mb-6">
            <div>
              <span className="text-imdb-gray-400">Born: </span>
              <span className="text-white">
                {new Date(mockActor.birthDate).toLocaleDateString()} in{' '}
                {mockActor.birthPlace}
              </span>
            </div>
            <div>
              <span className="text-imdb-gray-400">Height: </span>
              <span className="text-white">{mockActor.height}</span>
            </div>
          </div>
          <p className="text-imdb-gray-300 mb-6">{mockActor.biography}</p>
          <div className="flex gap-4">
            <button className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded-imdb font-medium hover:bg-yellow-500">
              Follow
            </button>
            <button className="border border-imdb-gray-300 text-white px-6 py-2 rounded-imdb font-medium hover:bg-imdb-gray-800">
              Share
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-imdb-gray-800 mb-8">
        <div className="flex space-x-8">
          {['bio', 'filmography', 'awards'].map((tab) => (
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

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-imdb-gray-300 mb-6">{mockActor.biography}</p>
              
              <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-imdb-gray-400">Born: </span>
                  <span className="text-white">
                    {new Date(mockActor.birthDate).toLocaleDateString()} in{' '}
                    {mockActor.birthPlace}
                  </span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Height: </span>
                  <span className="text-white">{mockActor.height}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-imdb-gray-400">Age: </span>
                  <span className="text-white">
                    {new Date().getFullYear() - new Date(mockActor.birthDate).getFullYear()} years old
                  </span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Nationality: </span>
                  <span className="text-white">American</span>
                </div>
                <div>
                  <span className="text-imdb-gray-400">Occupation: </span>
                  <span className="text-white">Actor</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filmography' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockActor.filmography.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="aspect-[2/3] rounded-imdb overflow-hidden bg-imdb-gray-800">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-imdb-base truncate">{movie.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-imdb-gray-400 text-imdb-sm">{movie.year}</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">•</span>
                    <span className="text-imdb-gray-400 text-imdb-sm">{movie.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="space-y-6">
            {mockActor.awards.map((award) => (
              <div key={award.id} className="bg-imdb-gray-800 rounded-imdb p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{award.award}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-imdb-yellow">{award.year}</span>
                      <span className="text-imdb-gray-400">•</span>
                      <span className="text-imdb-gray-400">{award.category}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-imdb ${
                    award.result === 'Nominated'
                      ? 'bg-imdb-gray-700 text-imdb-gray-300'
                      : 'bg-imdb-yellow text-imdb-dark'
                  }`}>
                    {award.result}
                  </span>
                </div>
                <div className="text-imdb-gray-300">
                  For: {award.movie}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActorDetail; 