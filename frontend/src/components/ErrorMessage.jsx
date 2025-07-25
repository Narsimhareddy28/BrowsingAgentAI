import React from 'react'

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* Error Icon */}
          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-red-400 text-lg">⚠️</span>
          </div>
          
          {/* Error Content */}
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-1">
              Analysis Failed
            </h3>
            <p className="text-red-300 text-sm leading-relaxed">
              {message}
            </p>
            
            {/* Helpful Tips */}
            <div className="mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10">
              <p className="text-red-300 text-xs mb-2 font-medium">💡 Try these solutions:</p>
              <ul className="text-red-300/80 text-xs space-y-1">
                <li>• Check your internet connection</li>
                <li>• Make sure the API server is running on port 8000</li>
                <li>• Try a different stock symbol or question</li>
                <li>• Refresh the page and try again</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 transition-colors ml-4 flex-shrink-0"
          title="Close error message"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg text-xs font-medium transition-all duration-200"
        >
          🔄 Refresh Page
        </button>
        <button
          onClick={() => {
            // Simple retry mechanism - could be enhanced
            window.location.hash = '#dashboard'
            onClose()
          }}
          className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 rounded-lg text-xs font-medium transition-all duration-200"
        >
          🏠 Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage 