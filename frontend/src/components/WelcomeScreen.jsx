import React from 'react'

const WelcomeScreen = ({ onQuickAction }) => {
  const exampleQuestions = [
    {
      icon: '🍎',
      text: "What's the current price of Apple stock?",
      action: () => onQuickAction('popular_stocks')
    },
    {
      icon: '🚗',
      text: "Should I buy Tesla stock now?",
      action: () => onQuickAction('tech_stocks')
    },
    {
      icon: '💻',
      text: "Compare NVIDIA vs AMD stocks",
      action: () => onQuickAction('ai_stocks')
    },
    {
      icon: '📊',
      text: "What are the best tech stocks to buy?",
      action: () => onQuickAction('market_overview')
    }
  ]

  const features = [
    {
      icon: '📊',
      title: 'Live Market Data',
      description: 'Real-time stock prices and market information'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Comprehensive stock analysis using advanced AI'
    },
    {
      icon: '📈',
      title: 'Investment Insights',
      description: 'BUY/HOLD/SELL recommendations with reasoning'
    },
    {
      icon: '🔍',
      title: 'Smart Research',
      description: 'Multiple data sources for accurate information'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Main Welcome Message */}
      <div className="mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-white text-3xl">📈</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Stock Research AI
        </h1>
        
        <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
          Your intelligent assistant for stock market analysis, live data, and investment insights. 
          Ask me anything about stocks, markets, or investments!
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">📊 Live Market Data</span>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">🤖 AI-Powered</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">📈 Real-time Analysis</span>
        </div>
      </div>

      {/* Example Questions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">
          💡 Try asking me about:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {exampleQuestions.map((example, index) => (
            <button
              key={index}
              onClick={example.action}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500/50 rounded-xl p-4 text-left transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{example.icon}</span>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  "{example.text}"
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">
          🚀 What I can do for you:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          ⚡ Quick Actions
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onQuickAction('popular_stocks')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>🔥</span>
            <span>Popular Stocks</span>
          </button>
          <button
            onClick={() => onQuickAction('tech_stocks')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>💻</span>
            <span>Tech Stocks</span>
          </button>
          <button
            onClick={() => onQuickAction('ai_stocks')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>🤖</span>
            <span>AI Stocks</span>
          </button>
          <button
            onClick={() => onQuickAction('market_overview')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Market Overview</span>
          </button>
        </div>
      </div>

      {/* Footer Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-blue-400 text-lg">💡</span>
          <span className="text-blue-400 font-semibold">Pro Tips</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <span className="text-blue-400 font-medium">Be Specific</span>
            <p className="text-gray-400 mt-1">Use stock symbols (AAPL, TSLA) for better results</p>
          </div>
          <div className="text-center">
            <span className="text-blue-400 font-medium">Ask Details</span>
            <p className="text-gray-400 mt-1">"Should I buy" gets better analysis than just "price"</p>
          </div>
          <div className="text-center">
            <span className="text-blue-400 font-medium">Compare Stocks</span>
            <p className="text-gray-400 mt-1">Ask "Compare X vs Y" for side-by-side analysis</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          ⚠️ This tool provides information for educational purposes only. Not financial advice. 
          Always do your own research before making investment decisions.
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen 