import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-8 max-w-sm mx-4 text-center">
        {/* Animated Stock Chart */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto relative">
            {/* Spinning circle */}
            <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse">📈</span>
            </div>
          </div>
          
          {/* Floating dots */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-lg font-semibold text-white mb-2">
          Analyzing Stock Data
        </h3>
        
        {/* Progress Steps */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Fetching live market data</span>
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Analyzing financial metrics</span>
            <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Generating insights</span>
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className="text-blue-400 text-sm">
          <div className="animate-pulse">
            🤖 AI is crunching the numbers...
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          This usually takes 5-10 seconds
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner 