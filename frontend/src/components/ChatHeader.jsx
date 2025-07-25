import React, { useState } from 'react'

const ChatHeader = ({ messageCount, onClearChat }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left side - Bot info */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
        </div>
        <div>
          <h1 className="text-white font-semibold">Stock Research AI</h1>
          <p className="text-sm text-green-400 flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Online</span>
          </p>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        {/* Message count */}
        {messageCount > 0 && (
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
            <span>💬</span>
            <span>{messageCount} messages</span>
          </div>
        )}

        {/* Menu button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-600 z-20">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onClearChat()
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <span>🗑️</span>
                    <span>Clear Chat</span>
                  </button>
                  <button
                    onClick={() => {
                      window.open('http://localhost:8000/docs', '_blank')
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <span>📚</span>
                    <span>API Docs</span>
                  </button>
                  <div className="border-t border-gray-600 my-2"></div>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Stock Research Assistant v1.0
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default ChatHeader 