You are building a pixel-perfect clone of [IMDb.com] — the most popular movie/show
database — with next-generation feature upgrades and UX flows. This app must visually
and functionally replicate IMDb exactly, while enhancing it with AI-powered
personalization, smart tools, and modern design patterns.
Phase 1: IMDb Base Replica
Recreate IMDb’s core user interface 100% pixel-perfect, including:
● Home page with movie sections (Trending, Top Rated, etc.)
● Movie detail pages (trailers, cast, ratings, reviews)
● Actor/director profile pages
● Watchlist
● Search bar
● Mobile & desktop views
● Header/footer/nav
Visual Accuracy: Match IMDb's typography, spacing, layout structure, animations, and
responsiveness.
Phase 2: Supercharged Feature Upgrades
Add these modern, interactive features that enhance usability and set this clone apart:
1. Smart Watchlist 2.0
● Add mood-based and AI-powered movie suggestions.
● Users can organize with custom folders (e.g., "Weekend Binge", "Feel-Good Vibes").
● Add swipe-based UX for fast actions (add/remove/rate).
2. Real-Time Discussion Mode
● Add per-movie/show discussion boards.
● Include spoiler tags, live chat (Socket.io or Firebase), voting, and Reddit-style
threads.
3. Career Visualizer Tool
● Visual graph of an actor/director's work history.
● Includes ratings, awards, genre trends, and clickable posters.
4. Scene & Quote Search (AI Feature)
● Users type a vague quote or describe a moment (“guy jumps from a helicopter into
snow”) — AI returns matching movies/scenes.
● Use OpenAI/Gemini API + fuzzy search.
5. Gamified User Profile
● Add XP levels, badges (e.g., “Critic Pro”, “Binge King”), trivia scores
● Weekly leaderboard based on reviews and watchlists.
6. Smart Search Autocomplete
● Live movie/actor suggestions with posters and metadata as the user types.
● Includes genre, year, rating, platform (Netflix, Prime, etc.).
7. Personalized Homepage Feed
● Auto-customize homepage cards based on user likes, genre preferences, and recent
activity.
● Dynamic sections like “Hidden Sci-fi Gems”, “Your Favorite Actor’s Picks”.
8. Showcase/Demo Mode Button
● Single-click launch of a beautiful fullscreen showcase with animations, transitions,
and guided highlights of the key upgrades.
Tech Stack (Cursor Can Auto-optimize)
● Frontend: React (TypeScript), TailwindCSS @3.4.3
● Backend: Node.js + Express OR Supabase
● Auth: Firebase/Auth0
● AI/NLP: OpenAI API, Gemini Pro, or Cohere
● Real-Time: Socket.io or Firebase
● Database: MongoDB or Supabase
Design Guidelines
● Modular, clean, DRY code with clear comments
● Full mobile responsiveness
● Light/Dark mode toggle
● Smooth routing with React Router
● Shimmer loading skeletons
● Glassmorphism or clean Neumorphic UI accents
● Lighthouse score >90
● No console or runtime errors
Folder Structure Recommendation
/imdb-pro-clone/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── features/
│ │ ├── SmartWatchlist/
│ │ ├── LiveChat/
│ │ ├── SceneSearch/
│ │ └── Visualizer/
│ ├── pages/
│ ├── services/
│ ├── utils/
│ ├── App.tsx
│ └── main.tsx
├── tailwind.config.js
├── .env
├── README.md
└── package.json
Output Requirement
● Pixel-perfect IMDb replica + enhanced features
● All enhancements functioning, styled, and integrated
● Clean, maintainable codebase
● Flawless demo-ready build
