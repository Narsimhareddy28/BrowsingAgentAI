import React from 'react'

const Dashboard = ({ searchHistory, favorites, onQuickSearch }) => {
  const quickSearchOptions = [
    { symbol: 'AAPL', company: 'Apple Inc.', query: 'What is Apple stock price today?' },
    { symbol: 'TSLA', company: 'Tesla Inc.', query: 'Should I buy Tesla stock now?' },
    { symbol: 'MSFT', company: 'Microsoft', query: 'How is Microsoft performing this quarter?' },
    { symbol: 'NVDA', company: 'NVIDIA', query: 'NVIDIA stock analysis and price target' },
    { symbol: 'GOOGL', company: 'Google', query: 'Is Google stock a good investment?' },
    { symbol: 'AMZN', company: 'Amazon', query: 'Amazon stock performance and outlook' },
  ]

  const trendingTopics = [
    { icon: '🚗', title: 'EV Stocks', description: 'Electric vehicle companies making moves' },
    { icon: '🤖', title: 'AI & Tech', description: 'Artificial intelligence and technology stocks' },
    { icon: '💊', title: 'Healthcare', description: 'Pharmaceutical and biotech stocks' },
    { icon: '🏦', title: 'Banking', description: 'Financial sector performance' },
    { icon: '⚡', title: 'Energy', description: 'Oil, gas, and renewable energy stocks' },
    { icon: '🏠', title: 'Real Estate', description: 'REITs and property-related stocks' },
  ]

  const recentSearchesDisplay = searchHistory.slice(0, 5)
  const favoritesDisplay = favorites.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold mb-2">Welcome to Stock Research Assistant</h1>
            <p className="text-blue-100 text-lg">
              Get AI-powered analysis, live market data, and investment insights for any stock
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">📊 Live Market Data</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">🤖 AI Analysis</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">📈 Investment Insights</span>
            </div>
          </div>
          <div className="text-8xl opacity-50">📈</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Searches</p>
              <p className="text-2xl font-bold text-white">{searchHistory.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Favorite Stocks</p>
              <p className="text-2xl font-bold text-white">{favorites.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Live Data Searches</p>
              <p className="text-2xl font-bold text-white">
                {searchHistory.filter(item => item.needsSearch).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search - Popular Stocks */}
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
        <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
          <span>⚡</span>
          <span>Quick Analysis - Popular Stocks</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickSearchOptions.map((stock, index) => (
            <button
              key={index}
              onClick={() => onQuickSearch(stock.query)}
              className="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-500/50 rounded-lg p-4 text-left transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {stock.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{stock.symbol}</p>
                    <p className="text-xs text-gray-400">{stock.company}</p>
                  </div>
                </div>
                <span className="text-blue-400 group-hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Click to analyze
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Searches */}
        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
            <span>📋</span>
            <span>Recent Searches</span>
          </h2>
          {recentSearchesDisplay.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-400">No searches yet</p>
              <p className="text-sm text-gray-500 mt-1">Start by asking about a stock above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSearchesDisplay.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-pointer transition-all duration-200 border border-gray-600 hover:border-blue-500/50"
                  onClick={() => onQuickSearch(item.question)}
                >
                  <p className="text-gray-100 text-sm mb-1">{item.question}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.needsSearch 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.needsSearch ? 'Live' : 'Cached'}
                    </span>
                  </div>
                </div>
              ))}
              {searchHistory.length > 5 && (
                <div className="text-center pt-2">
                  <span className="text-sm text-gray-400">
                    +{searchHistory.length - 5} more in history
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trending Topics */}
        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
            <span>🔥</span>
            <span>Trending Topics</span>
          </h2>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onQuickSearch(`What are the best ${topic.title.toLowerCase()} stocks to buy now?`)}
                className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-left transition-all duration-200 border border-gray-600 hover:border-blue-500/50 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </p>
                    <p className="text-sm text-gray-400">{topic.description}</p>
                  </div>
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Favorites Preview */}
      {favoritesDisplay.length > 0 && (
        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
            <span>⭐</span>
            <span>Your Favorite Stocks</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favoritesDisplay.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-400">{favorite.symbol || 'Stock'}</h3>
                  <span className="text-yellow-400">⭐</span>
                </div>
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">{favorite.question}</p>
                <p className="text-xs text-gray-500">
                  Added {new Date(favorite.addedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          {favorites.length > 3 && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-400">
                +{favorites.length - 3} more in favorites
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-blue-500/20 p-6">
        <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center space-x-2">
          <span>💡</span>
          <span>Pro Tips</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Be Specific</p>
              <p className="text-gray-400 text-sm">Use stock symbols (AAPL, TSLA) for better results</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Ask Detailed Questions</p>
              <p className="text-gray-400 text-sm">"Should I buy" gets better analysis than just "price"</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Compare Stocks</p>
              <p className="text-gray-400 text-sm">Ask "Compare AAPL vs MSFT" for side-by-side analysis</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Save Favorites</p>
              <p className="text-gray-400 text-sm">Star important analyses to track your portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 