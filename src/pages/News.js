import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockNews = [
  {
    id: 1,
    title: 'Oscars 2024: Complete Winners List',
    date: '2024-03-10',
    author: 'IMDb Staff',
    category: 'Awards',
    image: '/images/oscars-2024.jpg',
    excerpt:
      'The 96th Academy Awards have concluded, with Oppenheimer taking home seven awards including Best Picture. See the complete list of winners.',
    trending: true,
  },
  {
    id: 2,
    title: 'Dune: Part Two Breaks Box Office Records',
    date: '2024-03-08',
    author: 'IMDb Staff',
    category: 'Box Office',
    image: '/images/dune2-box-office.jpg',
    excerpt:
      'Denis Villeneuve\'s sci-fi epic has surpassed expectations, earning $81.5 million in its opening weekend.',
    trending: true,
  },
  {
    id: 3,
    title: 'New Marvel Series Announced at Disney+',
    date: '2024-03-07',
    author: 'IMDb Staff',
    category: 'TV News',
    image: '/images/marvel-disney.jpg',
    excerpt:
      'Disney+ has announced several new Marvel series, including a new season of Loki and a new show featuring the Fantastic Four.',
    trending: false,
  },
  {
    id: 4,
    title: 'Christopher Nolan\'s Next Project Revealed',
    date: '2024-03-06',
    author: 'IMDb Staff',
    category: 'Movie News',
    image: '/images/nolan-next.jpg',
    excerpt:
      'After the success of Oppenheimer, Christopher Nolan has announced his next project will be a sci-fi thriller.',
    trending: false,
  },
];

const categories = [
  'All',
  'Movie News',
  'TV News',
  'Awards',
  'Box Office',
  'Celebrity',
  'Trailers',
  'Reviews',
];

function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const filteredNews = mockNews.filter(
    (news) => activeCategory === 'All' || news.category === activeCategory
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'trending') {
      return b.trending - a.trending;
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">IMDb News</h1>
          <p className="text-imdb-gray-400 mt-2">
            The latest news from the world of movies and TV
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-imdb-gray-800 text-white px-4 py-2 rounded-imdb focus:outline-none focus:ring-2 focus:ring-imdb-yellow"
          >
            <option value="date">Sort by Date</option>
            <option value="trending">Sort by Trending</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-imdb ${
              activeCategory === category
                ? 'bg-imdb-yellow text-imdb-dark'
                : 'bg-imdb-gray-800 text-imdb-gray-300 hover:bg-imdb-gray-700'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Featured News */}
      {sortedNews[0] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Link to={`/news/${sortedNews[0].id}`}>
            <div className="aspect-[16/9] rounded-imdb overflow-hidden bg-imdb-gray-800">
              <img
                src={sortedNews[0].image}
                alt={sortedNews[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-imdb-dark to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="bg-imdb-yellow text-imdb-dark px-2 py-1 rounded-imdb text-sm font-medium">
                  {sortedNews[0].category}
                </span>
                {sortedNews[0].trending && (
                  <span className="bg-green-900 text-green-400 px-2 py-1 rounded-imdb text-sm font-medium">
                    Trending
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">{sortedNews[0].title}</h2>
              <p className="text-imdb-gray-300 mb-2">{sortedNews[0].excerpt}</p>
              <div className="flex items-center space-x-4 text-imdb-gray-400">
                <span>{sortedNews[0].author}</span>
                <span>•</span>
                <span>
                  {new Date(sortedNews[0].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNews.slice(1).map((news) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-imdb-gray-800 rounded-imdb overflow-hidden"
          >
            <Link to={`/news/${news.id}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="bg-imdb-gray-700 text-imdb-gray-300 px-2 py-1 rounded-imdb text-xs">
                    {news.category}
                  </span>
                  {news.trending && (
                    <span className="bg-green-900 text-green-400 px-2 py-1 rounded-imdb text-xs">
                      Trending
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-medium mb-2 hover:text-imdb-yellow transition-colors">
                  {news.title}
                </h3>
                <p className="text-imdb-gray-400 text-sm mb-4">{news.excerpt}</p>
                <div className="flex items-center space-x-4 text-imdb-gray-500 text-sm">
                  <span>{news.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(news.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default News; 