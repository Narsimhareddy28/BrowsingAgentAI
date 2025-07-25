import React, { useState } from 'react'

const StockResults = ({ results, onAddToFavorites, favorites }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showFullAnswer, setShowFullAnswer] = useState(false)

  if (!results) {
    return (
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-8 text-center">
        <p className="text-gray-400">No results to display</p>
      </div>
    )
  }

  const handleAddToFavorites = () => {
    onAddToFavorites({
      question: results.question,
      symbol: extractStockSymbol(results.question),
      answer: results.answer.substring(0, 200) + '...',
    })
    setIsFavorited(true)
    setTimeout(() => setIsFavorited(false), 2000)
  }

  const extractStockSymbol = (question) => {
    // Simple regex to extract stock symbols (3-5 uppercase letters)
    const match = question.match(/\b[A-Z]{3,5}\b/)
    return match ? match[0] : 'Stock'
  }

  const formatAnswer = (answer) => {
    // Split by common markdown headers and format
    const sections = answer.split(/(?=\*\*[^*]+\*\*:?)/).filter(section => section.trim())
    
    return sections.map((section, index) => {
      if (section.includes('**') && section.includes(':')) {
        const [header, ...content] = section.split(':')
        const cleanHeader = header.replace(/\*\*/g, '').trim()
        const cleanContent = content.join(':').trim()
        
        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center space-x-2">
              <span>{getSectionIcon(cleanHeader)}</span>
              <span>{cleanHeader}</span>
            </h3>
            <div className="text-gray-300 leading-relaxed pl-6">
              {formatContent(cleanContent)}
            </div>
          </div>
        )
      } else {
        return (
          <div key={index} className="mb-4 text-gray-300 leading-relaxed">
            {formatContent(section)}
          </div>
        )
      }
    })
  }

  const getSectionIcon = (header) => {
    const iconMap = {
      'Current Market Data': '📊',
      'Financial Analysis': '💰',
      'Recent News': '📰',
      'Technical Analysis': '📈',
      'Investment Recommendation': '💡',
      'Risk Assessment': '⚠️',
      'Price Targets': '🎯',
      'Sources': '🔗',
    }
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (header.toLowerCase().includes(key.toLowerCase())) {
        return icon
      }
    }
    return '📋'
  }

  const formatContent = (content) => {
    // Format bullet points and line breaks
    return content
      .split('\n')
      .map((line, idx) => {
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          return (
            <div key={idx} className="flex items-start space-x-2 mb-1">
              <span className="text-blue-400 mt-1">•</span>
              <span>{line.replace(/^[-•]\s*/, '')}</span>
            </div>
          )
        }
        return line && <div key={idx} className="mb-2">{line}</div>
      })
      .filter(Boolean)
  }

  const extractSources = (answer) => {
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+[^\s<>"{}|\\^`\[\].,;:!?]/g
    return answer.match(urlRegex) || []
  }

  const sources = extractSources(results.answer)
  const answerPreview = results.answer.substring(0, 800)
  const isLongAnswer = results.answer.length > 800

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-blue-400 mb-2 flex items-center space-x-2">
              <span>📊</span>
              <span>Analysis Results</span>
            </h2>
            <p className="text-gray-300 bg-gray-700 rounded-lg p-3 border-l-4 border-blue-500">
              <strong>Question:</strong> "{results.question}"
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAddToFavorites}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                flex items-center space-x-2
                ${isFavorited 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600'
                }
              `}
            >
              <span>{isFavorited ? '✓' : '⭐'}</span>
              <span>{isFavorited ? 'Added!' : 'Favorite'}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-2 py-1 rounded ${
                results.needs_search 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {results.needs_search ? 'Live Data' : 'Cached'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Content */}
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">📈 Stock Analysis</h3>
          {isLongAnswer && (
            <button
              onClick={() => setShowFullAnswer(!showFullAnswer)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {showFullAnswer ? 'Show Less' : 'Show Full Analysis'}
            </button>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          {showFullAnswer || !isLongAnswer ? (
            <div>{formatAnswer(results.answer)}</div>
          ) : (
            <div>
              {formatAnswer(answerPreview)}
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowFullAnswer(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  ... Click to read full analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sources Section */}
      {sources.length > 0 && (
        <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <span>🔗</span>
            <span>Sources ({sources.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sources.slice(0, 6).map((source, index) => {
              const domain = new URL(source).hostname.replace('www.', '')
              return (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-500/50 rounded-lg p-3 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {domain.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-300 group-hover:text-white truncate">
                        {domain}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {source}
                      </p>
                    </div>
                    <span className="text-blue-400 group-hover:text-blue-300">↗</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Analysis Metadata */}
      <div className="bg-gray-800 rounded-xl border border-blue-500/20 p-4">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Analysis completed at {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <span>{results.sources_used?.length || 0} sources checked</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
              ⚠️ Not Financial Advice
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockResults 