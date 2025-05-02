import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-imdb-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get the IMDb App</h3>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 bg-imdb-gray-800 hover:bg-imdb-gray-700 px-4 py-2 rounded-imdb w-full">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.23 0-1.44.63-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.22-.19 2.4-.89 3.69-.84 1.55.07 2.85.5 3.83 1.33-3.48 2.12-2.6 6.45.5 7.7-.6 1.3-1.38 2.6-2.1 3.9zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.89 4.25-3.74 4.25z"/>
                </svg>
                <span>iOS</span>
              </button>
              <button className="flex items-center space-x-2 bg-imdb-gray-800 hover:bg-imdb-gray-700 px-4 py-2 rounded-imdb w-full">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-1.107-1.512-2.349-1.98-.836-.36-1.512-.586-1.98-.836-.836-.366-1.43-1.123-1.512-1.81.131-.628.587-1.309 1.23-1.309.586 0 .9.366 1.309.366.409 0 .9-.366 1.512-.366 1.02 0 1.96.587 2.349 1.512-2.094.9-1.76 3.309.9 3.309.409 0 .9-.131 1.309-.366z"/>
                </svg>
                <span>Android</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow IMDb</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-imdb-gray-400 hover:text-imdb-yellow">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-imdb-gray-400 hover:text-imdb-yellow">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-imdb-gray-400 hover:text-imdb-yellow">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-imdb-gray-400 hover:text-imdb-yellow">Home</Link></li>
              <li><Link to="/top-rated" className="text-imdb-gray-400 hover:text-imdb-yellow">Top Rated Movies</Link></li>
              <li><Link to="/most-popular" className="text-imdb-gray-400 hover:text-imdb-yellow">Most Popular Movies</Link></li>
              <li><Link to="/news" className="text-imdb-gray-400 hover:text-imdb-yellow">News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-imdb-gray-400 hover:text-imdb-yellow">Help Center</Link></li>
              <li><Link to="/contact" className="text-imdb-gray-400 hover:text-imdb-yellow">Contact Us</Link></li>
              <li><Link to="/feedback" className="text-imdb-gray-400 hover:text-imdb-yellow">Feedback</Link></li>
              <li><Link to="/jobs" className="text-imdb-gray-400 hover:text-imdb-yellow">Jobs</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-imdb-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-imdb-gray-400 text-sm">
              © 1990-{new Date().getFullYear()} IMDb, an Amazon company
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-imdb-gray-400 hover:text-imdb-yellow text-sm">Terms of Use</Link>
              <Link to="/privacy" className="text-imdb-gray-400 hover:text-imdb-yellow text-sm">Privacy Policy</Link>
              <Link to="/cookies" className="text-imdb-gray-400 hover:text-imdb-yellow text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 