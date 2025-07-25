import React from 'react'

const LoadingMessage = () => {
  return (
    <div className="flex items-start space-x-3">
      {/* AI Avatar */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-white text-sm animate-pulse">🤖</span>
      </div>

      {/* Loading Bubble */}
      <div className="bg-gray-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg max-w-xs">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-600">
          <span className="text-blue-400 font-semibold">Stock Research AI</span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs animate-pulse">
            📊 Analyzing...
          </span>
        </div>

        {/* Typing Indicator */}
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-gray-400 text-sm ml-2">AI is analyzing stock data...</span>
        </div>

        {/* Progress Steps */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-300">Fetching live market data</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Processing financial metrics</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span className="text-gray-500">Generating insights</span>
          </div>
        </div>

        {/* Fun Loading Text */}
        <div className="mt-3 pt-2 border-t border-gray-600">
          <div className="text-xs text-blue-400 animate-pulse flex items-center space-x-2">
            <span>🧠</span>
            <span>Crunching numbers and market trends...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingMessage 