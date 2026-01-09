import { Link } from "react-router-dom";
import { useState } from "react";
import { ArticleButtons } from "../components/ArticleButtons";
import { getPostRoute } from "../routes";

export function Home({ posts, loading, error, darkMode }) {
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const hasActiveFilters = search || selectedSource || dateFilter;

  // Get unique sources from posts
  const sources = [...new Set(posts.map(post =>
    post.url ? new URL(post.url).hostname.replace('www.', '') : 'Unknown'
  ))].filter(source => source !== 'Unknown');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesSource = selectedSource === "" ||
      (post.url && new URL(post.url).hostname.replace('www.', '') === selectedSource);

    const matchesDate = dateFilter === "" ||
      (post.date && new Date(post.date).toDateString() === new Date(dateFilter).toDateString());

    return matchesSearch && matchesSource && matchesDate;
  });

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedSource("");
    setDateFilter("");
  };

  const SkeletonCard = () => (
    <div className={`${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-xl shadow animate-pulse`}>
      <div className={`w-full h-48 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      <div className={`h-6 rounded mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      <div className={`h-4 rounded mb-4 w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      <div className={`h-3 rounded mb-3 w-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      <div className="flex gap-2">
        <div className={`h-6 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        <div className={`h-6 w-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-vh">
        {/* Breaking News Banner Skeleton */}
        <div className={`mb-6 p-4 rounded-lg border-l-4 animate-pulse ${
          darkMode
            ? 'bg-red-900/20 border-red-500'
            : 'bg-red-50 border-red-500'
        }`}>
          <div className={`h-6 rounded w-3/4 ${darkMode ? 'bg-red-800/50' : 'bg-red-200'}`}></div>
        </div>

        <div className={`text-3xl font-extrabold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Latest News</div>
        <div className="mb-6 flex justify-center">
          <div className={`w-full max-w-md h-10 rounded-lg animate-pulse ${
            darkMode ? 'bg-gray-800' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-vh flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg mb-2">Failed to load news</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-vh">
      {/* Breaking News Banner */}
      <div className={`mb-6 p-4 rounded-lg border-l-4 ${
        darkMode
          ? 'bg-red-900/20 border-red-500 text-red-300'
          : 'bg-red-50 border-red-500 text-red-800'
      }`}>
        <div className="flex items-center">
          <span className="font-bold text-lg mr-2">🚨</span>
          <span className="font-semibold">Breaking News:</span>
          <span className="ml-2 text-sm">
            {posts.length > 0 ? `${posts[0].title.slice(0, 60)}...` : 'Stay tuned for latest updates'}
          </span>
        </div>
      </div>

      <h1 className={`text-3xl font-extrabold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Latest News</h1>

      {/* Search and Filters */}
      <div className={`mb-8 rounded-2xl border shadow-lg transition-colors ${
        darkMode
          ? 'bg-gray-900/60 border-gray-700 text-gray-100'
          : 'bg-white/90 border-gray-200 text-gray-900'
      }`}>
        <div className="flex flex-col lg:flex-row gap-4 p-5 items-end">
          {/* Search */}
          <div className="flex-1 w-full lg:w-auto">
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block text-xs font-semibold uppercase tracking-wide mb-2`}>Search articles</label>
            <div className="relative group">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} absolute left-3 top-1/2 -translate-y-1/2 text-lg`}>🔎</span>
              <input
                type="text"
                placeholder="Search headlines, topics, people..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full h-[46px] pl-11 pr-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-orange-400 focus:ring-offset-gray-900'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:ring-offset-white'
                }`}
              />
            </div>
          </div>

          {/* Source Filter */}
          <div className="w-full lg:w-44">
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block text-xs font-semibold uppercase tracking-wide mb-2`}>Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className={`w-full h-[46px] px-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-orange-400 focus:ring-offset-gray-900'
                  : 'bg-white border-gray-200 focus:ring-blue-500 focus:ring-offset-white'
              }`}
            >
              <option value="">All sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="w-full lg:w-44">
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} block text-xs font-semibold uppercase tracking-wide mb-2`}>Published</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`w-full h-[46px] px-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-orange-400 focus:ring-offset-gray-900'
                  : 'bg-white border-gray-200 focus:ring-blue-500 focus:ring-offset-white'
              }`}
            />
          </div>

          {/* Reset & Results */}
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
            <button
              onClick={resetFilters}
              className={`flex-1 lg:flex-none px-4 py-3 rounded-xl font-semibold shadow-sm transition-all whitespace-nowrap ${
                darkMode
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Reset
            </button>
            <div className={`flex-1 lg:flex-none flex items-center justify-center text-[11px] font-semibold tracking-wide uppercase rounded-xl border border-dashed px-3 py-2 ${
              darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-600'
            }`}>
              {filteredPosts.length} results
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className={`flex flex-wrap items-center gap-2 border-t px-5 py-3 text-xs ${
            darkMode ? 'border-gray-800 text-gray-300' : 'border-gray-200 text-gray-600'
          }`}>
            <span className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-50 text-blue-700'} px-2 py-1 rounded-full font-semibold tracking-wide`}>Active filters</span>
            {search && (
              <span className={`${darkMode ? 'bg-gray-800 text-orange-200' : 'bg-orange-50 text-orange-700'} px-2.5 py-1 rounded-full font-semibold`}>Search: "{search}"</span>
            )}
            {selectedSource && (
              <span className={`${darkMode ? 'bg-gray-800 text-blue-200' : 'bg-blue-50 text-blue-700'} px-2.5 py-1 rounded-full font-semibold`}>Source: {selectedSource}</span>
            )}
            {dateFilter && (
              <span className={`${darkMode ? 'bg-gray-800 text-emerald-200' : 'bg-emerald-50 text-emerald-700'} px-2.5 py-1 rounded-full font-semibold`}>Date: {new Date(dateFilter).toLocaleDateString()}</span>
            )}
            <button
              onClick={resetFilters}
              className={`${darkMode ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'} font-semibold underline`}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={`${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <Link
              to={getPostRoute(post.id)}
              className={`block text-xl font-semibold hover:underline mb-3 ${
                darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {post.title}
            </Link>
            <p className={`text-sm mb-4 line-clamp-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {post.content.slice(0, 120)}...
            </p>
            <div className={`text-xs mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              By {post.author || 'Unknown'} • {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'} • {calculateReadingTime(post.content)}
            </div>
            <div className="mb-3">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
              }`}>
                {post.url ? new URL(post.url).hostname.replace('www.', '') : 'Unknown Source'}
              </span>
            </div>
            <ArticleButtons article={post} darkMode={darkMode} />
          </div>
        ))}
      </div>
    </div>
  );
}
