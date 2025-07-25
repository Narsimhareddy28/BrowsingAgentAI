import React, { useState } from 'react'

const Sidebar = ({ 
  currentView, 
  setCurrentView, 
  searchHistory, 
  favorites, 
  onHistoryItemClick, 
  onRemoveFavorite 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '🏠', description: 'Overview & quick actions' },
    { key: 'results', label: 'Results', icon: '📊', description: 'Latest analysis' },
    { key: 'history', label: 'History', icon: '📋', description: 'Search history' },
    { key: 'favorites', label: 'Favorites', icon: '⭐', description: 'Saved stocks' },
  ]

  const recentHistory = searchHistory.slice(0, 3)
  const topFavorites = favorites.slice(0, 3)

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-700 z-50
        transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        ${isCollapsed ? 'lg:w-16' : 'w-64'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📈</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Stock Assistant</h2>
                  <p className="text-gray-400 text-xs">AI-Powered Analysis</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentView(item.key)
                  // Auto-collapse on mobile after selection
                  if (window.innerWidth < 1024) setIsCollapsed(true)
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${currentView === item.key
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
                title={isCollapsed ? item.label : ''}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs opacity-75 truncate">{item.description}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {!isCollapsed && (
          <>
            {/* Quick Stats */}
            <div className="px-4 py-3 border-t border-gray-700">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Searches</span>
                  <span className="text-blue-400 font-medium">{searchHistory.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Favorites</span>
                  <span className="text-yellow-400 font-medium">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Live Data</span>
                  <span className="text-green-400 font-medium">
                    {searchHistory.filter(item => item.needsSearch).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent History */}
            {recentHistory.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-700">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentHistory.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onHistoryItemClick(item.question)}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <p className="text-sm text-gray-300 group-hover:text-white truncate">
                        {item.question}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${
                          item.needsSearch 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-gray-600/50 text-gray-400'
                        }`}>
                          {item.needsSearch ? 'Live' : 'Cache'}
                        </span>
                      </div>
                    </button>
                  ))}
                  {searchHistory.length > 3 && (
                    <button
                      onClick={() => setCurrentView('history')}
                      className="w-full text-center py-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View all {searchHistory.length} searches →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Top Favorites */}
            {topFavorites.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-700">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Favorite Stocks
                </h3>
                <div className="space-y-2">
                  {topFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <span className="text-yellow-400 text-sm">⭐</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-400 truncate">
                              {favorite.symbol || 'Stock'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {favorite.question}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFavorite(favorite.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {favorites.length > 3 && (
                    <button
                      onClick={() => setCurrentView('favorites')}
                      className="w-full text-center py-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View all {favorites.length} favorites →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">API Connected</span>
                </div>
                <p className="text-xs text-gray-500">
                  Stock Research Assistant v1.0
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`
          fixed top-4 left-4 z-40 lg:hidden
          w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center
          text-white shadow-lg
          ${isCollapsed ? 'block' : 'hidden'}
        `}
      >
        📈
      </button>
    </>
  )
}

export default Sidebar 