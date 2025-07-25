import React, { useState } from 'react'

const SearchForm = ({ onSearch, disabled }) => {
  const [question, setQuestion] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const suggestedQueries = [
    "What's the current price of Apple stock?",
    "Should I buy Tesla stock now?",
    "Compare NVIDIA vs AMD stocks",
    "What are the best tech stocks to buy?",
    "How is Microsoft performing this quarter?",
    "What's happening with GameStop stock?",
    "Is Amazon stock overvalued?",
    "Should I invest in crypto stocks?",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (question.trim() && !disabled) {
      onSearch(question.trim())
    }
  }

  const handleSuggestedQuery = (query) => {
    setQuestion(query)
    onSearch(query)
    setIsExpanded(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-400 flex items-center space-x-2">
          <span>🔍</span>
          <span>Stock Analysis</span>
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1"
        >
          <span>Suggestions</span>
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about stocks... (e.g., 'What's the current price of AAPL?', 'Should I buy Tesla?')"
            disabled={disabled}
            rows={3}
            className={`
              w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
              text-gray-100 placeholder-gray-400 resize-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
              transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {question.length}/500
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={disabled || !question.trim()}
            className={`
              flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
              flex items-center justify-center space-x-2
              ${disabled || !question.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
              }
            `}
          >
            {disabled ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Analyze Stock</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setQuestion('')}
            disabled={disabled || !question}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Suggested Queries */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            💡 Try these examples:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuery(query)}
                disabled={disabled}
                className={`
                  text-left p-3 rounded-lg border border-gray-600 
                  hover:border-blue-500/50 hover:bg-gray-700 
                  transition-all duration-200 text-sm text-gray-300
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                "{query}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-400 flex items-start space-x-2">
          <span>💡</span>
          <span>
            <strong>Pro tip:</strong> Be specific with stock symbols (AAPL, TSLA, MSFT) or company names. 
            Ask about prices, recommendations, comparisons, or market analysis.
          </span>
        </p>
      </div>
    </div>
  )
}

export default SearchForm 