import React, { useState, useRef } from 'react'

const ChatInput = ({ onSendMessage, disabled, onQuickAction }) => {
  const [message, setMessage] = useState('')
  const [showQuickActions, setShowQuickActions] = useState(false)
  const textareaRef = useRef(null)

  const quickActions = [
    { 
      id: 'popular_stocks', 
      icon: '🔥', 
      label: 'Popular Stocks',
      description: 'Most popular stocks to buy'
    },
    { 
      id: 'tech_stocks', 
      icon: '💻', 
      label: 'Tech Stocks',
      description: 'Best technology investments'
    },
    { 
      id: 'market_overview', 
      icon: '📊', 
      label: 'Market Overview',
      description: 'Today\'s market performance'
    },
    { 
      id: 'ai_stocks', 
      icon: '🤖', 
      label: 'AI Stocks',
      description: 'AI & machine learning stocks'
    },
    { 
      id: 'dividend_stocks', 
      icon: '💰', 
      label: 'Dividend Stocks',
      description: 'Best dividend-paying stocks'
    },
    { 
      id: 'growth_stocks', 
      icon: '📈', 
      label: 'Growth Stocks',
      description: 'Top growth investments'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      setShowQuickActions(false)
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '20px'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '20px'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  const handleQuickActionClick = (actionId) => {
    onQuickAction(actionId)
    setShowQuickActions(false)
  }

  return (
    <div className="relative">
      {/* Quick Actions Popup */}
      {showQuickActions && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowQuickActions(false)}
          />
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-gray-700 rounded-xl shadow-lg border border-gray-600 z-20 max-h-64 overflow-y-auto">
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Actions</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickActionClick(action.id)}
                    className="flex items-center space-x-2 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-left group"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-blue-400">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {action.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Input Area */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Quick Actions Button */}
        <button
          type="button"
          onClick={() => setShowQuickActions(!showQuickActions)}
          disabled={disabled}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200
            ${disabled 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-blue-400'
            }
          `}
          title="Quick Actions"
        >
          <span className="text-lg">⚡</span>
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "AI is thinking..." : "Ask about any stock... (e.g., 'What's Apple's current price?')"}
            disabled={disabled}
            rows={1}
            className={`
              w-full bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3 pr-12
              text-gray-100 placeholder-gray-400 resize-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
              transition-all duration-200 overflow-hidden
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Character counter */}
          {message.length > 0 && (
            <div className="absolute bottom-1 right-12 text-xs text-gray-500">
              {message.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200
            ${disabled || !message.trim()
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            }
          `}
          title={disabled ? "Please wait..." : "Send message"}
        >
          {disabled ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>

      {/* Input Tips */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span>💡 Try:</span>
        <button
          onClick={() => setMessage("What's the current price of Apple stock?")}
          className="hover:text-blue-400 transition-colors"
        >
          "Apple stock price"
        </button>
        <span>•</span>
        <button
          onClick={() => setMessage("Should I buy Tesla stock now?")}
          className="hover:text-blue-400 transition-colors"
        >
          "Tesla investment advice"
        </button>
        <span>•</span>
        <button
          onClick={() => setMessage("Compare NVIDIA vs AMD stocks")}
          className="hover:text-blue-400 transition-colors"
        >
          "Stock comparison"
        </button>
      </div>
    </div>
  )
}

export default ChatInput 