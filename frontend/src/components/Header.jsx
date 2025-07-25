import React from 'react'

const Header = ({ currentView, setCurrentView }) => {
  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Stock Market Dashboard'
      case 'results':
        return 'Analysis Results'
      case 'history':
        return 'Search History'
      case 'favorites':
        return 'Favorite Stocks'
      default:
        return 'Stock Research Assistant'
    }
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📈</span>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              {getViewTitle()}
            </h1>
            <p className="text-sm text-gray-400 hidden sm:block">
              AI-Powered Stock Market Analysis
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="flex flex-wrap gap-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
            { key: 'history', label: 'History', icon: '📋' },
            { key: 'favorites', label: 'Favorites', icon: '⭐' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentView(item.key)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center space-x-2
                ${currentView === item.key
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }
              `}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>API Connected</span>
          </div>
          <div className="hidden sm:block">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
            LIVE DATA
          </span>
          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
            Real-time Analysis
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header 