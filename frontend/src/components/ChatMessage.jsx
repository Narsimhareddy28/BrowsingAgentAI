import React, { useState } from 'react'

const ChatMessage = ({ message, onRetry }) => {
  const [showFullAnswer, setShowFullAnswer] = useState(false)

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
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
          <div key={index} className="mb-4">
            <h4 className="text-blue-400 font-semibold mb-2 flex items-center space-x-2">
              <span>{getSectionIcon(cleanHeader)}</span>
              <span>{cleanHeader}</span>
            </h4>
            <div className="text-gray-300 leading-relaxed pl-6">
              {formatContent(cleanContent)}
            </div>
          </div>
        )
      } else {
        return (
          <div key={index} className="mb-3 text-gray-300 leading-relaxed">
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

  // User Message
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl">
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
            <p className="leading-relaxed">{message.content}</p>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Error Message
  if (message.type === 'error') {
    return (
      <div className="flex justify-center">
        <div className="max-w-md bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl">⚠️</span>
            <span className="text-red-400 font-semibold">Error</span>
          </div>
          <p className="text-red-300 text-sm mb-3">{message.content}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    )
  }

  // AI Message
  const sources = extractSources(message.content)
  const isLongAnswer = message.content.length > 1000
  const answerPreview = message.content.substring(0, 1000)

  return (
    <div className="flex items-start space-x-3">
      {/* AI Avatar */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-white text-sm">🤖</span>
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-4xl">
        {/* Message Bubble */}
        <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
          {/* Message Header */}
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-600">
            <span className="text-blue-400 font-semibold">Stock Research AI</span>
            {message.needs_search && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                📊 Live Data
              </span>
            )}
          </div>

          {/* Answer Content */}
          <div className="prose prose-invert max-w-none">
            {showFullAnswer || !isLongAnswer ? (
              <div>{formatAnswer(message.content)}</div>
            ) : (
              <div>
                {formatAnswer(answerPreview)}
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowFullAnswer(true)}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm px-3 py-1 bg-blue-500/10 rounded-lg"
                  >
                    📖 Show Full Analysis
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-600">
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center space-x-1">
                <span>🔗</span>
                <span>Sources ({sources.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sources.slice(0, 4).map((source, index) => {
                  const domain = new URL(source).hostname.replace('www.', '')
                  return (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm group"
                    >
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        {domain.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-300 group-hover:text-white truncate flex-1">
                        {domain}
                      </span>
                      <span className="text-blue-400 group-hover:text-blue-300">↗</span>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Timestamp and metadata */}
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
          <span>{formatTimestamp(message.timestamp)}</span>
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
            ⚠️ Not Financial Advice
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage 