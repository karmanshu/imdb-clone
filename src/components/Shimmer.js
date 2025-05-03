import React from 'react';

const Shimmer = ({ className = '', count = 1 }) => {
  const shimmerItems = Array(count).fill(0);

  return (
    <>
      {shimmerItems.map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-imdb-gray-200 dark:bg-imdb-gray-700 rounded-lg ${className}`}
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
      ))}
    </>
  );
};

export default Shimmer; 