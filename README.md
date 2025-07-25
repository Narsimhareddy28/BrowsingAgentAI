# 📈 Stock Market Research Assistant

A comprehensive full-stack application for AI-powered stock market analysis with live data, featuring a modern React frontend and FastAPI backend.

## 🌟 Features

### 🎯 **Core Capabilities**
- 🔍 **Smart Search Detection**: Automatically determines if external search is needed
- 📊 **Live Market Data**: Real-time stock prices and market information via Tavily & Wikipedia
- 🤖 **AI Analysis**: Comprehensive stock analysis using Google's Gemini AI
- 📈 **Investment Recommendations**: BUY/HOLD/SELL recommendations with detailed reasoning
- ⭐ **Favorites System**: Save and track your favorite stock analyses
- 📋 **Search History**: Complete history of all your stock research

### 🎨 **Frontend Features**
- 🌑 **Dark Theme**: Beautiful dark UI with blue accents using Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🧩 **Modular Components**: Sidebar navigation, dashboard, results display
- ⚡ **Real-time Updates**: Live status indicators and progress tracking
- 🎭 **Interactive UI**: Animated loading states, hover effects, and transitions

### 🛠 **Backend Features**
- 🚀 **FastAPI**: High-performance async API with automatic documentation
- 🔄 **Exact Code Reuse**: Uses the exact same research logic from original Python script
- 📚 **Multiple Data Sources**: Web search, Wikipedia, and market data APIs
- 🎯 **Smart Routing**: Conditional search based on question analysis
- 📖 **Auto Documentation**: Interactive API docs at `/docs`

## 🚀 Quick Start

### Option 1: One-Command Start (Recommended)
```bash
# Make sure you're in the project root directory
./start_app.sh
```

This script will:
- ✅ Check and install all dependencies
- 🔧 Start the FastAPI backend on port 8000
- 🌐 Start the React frontend on port 5173
- 🎉 Open both services simultaneously

### Option 2: Manual Setup

#### 1. **Backend Setup**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

# Start FastAPI server
python fastapi_research.py
```

#### 2. **Frontend Setup**
```bash
# Install Node.js dependencies
cd frontend
npm install

# Start development server
npm run dev
```

## 🔗 Application URLs

Once running, access:
- 🌐 **Frontend UI**: http://localhost:5173
- 📊 **Backend API**: http://localhost:8000
- 📚 **API Documentation**: http://localhost:8000/docs
- 🔄 **API Redoc**: http://localhost:8000/redoc

## 📋 Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Google API Key** (for Gemini AI)
- **Internet connection** (for live market data)

## 🎮 How to Use

### 1. **Dashboard View**
- 📊 Overview statistics and recent activity
- ⚡ Quick analysis buttons for popular stocks (AAPL, TSLA, MSFT, etc.)
- 🔥 Trending topics in different sectors
- 💡 Pro tips for better analysis

### 2. **Stock Analysis**
- 💬 Ask questions like:
  - "What's the current price of Apple stock?"
  - "Should I buy Tesla stock now?"
  - "Compare NVIDIA vs AMD stocks"
  - "What are the best AI stocks to invest in?"
- 📈 Get comprehensive analysis with:
  - Current market data and prices
  - Financial metrics and ratios
  - Recent news impact analysis
  - Technical analysis and trends
  - Investment recommendations
  - Risk assessment
  - Price targets

### 3. **Search History**
- 📋 View all your previous stock research
- 🔍 Click any historical search to re-run analysis
- 🏷️ See which searches used live data vs cached responses

### 4. **Favorites**
- ⭐ Save important stock analyses
- 📌 Quick access to your tracked stocks
- 🗂️ Organize your investment research

## 🏗️ Project Structure

```
RA/
├── 📄 fastapi_research.py      # FastAPI backend (uses exact original logic)
├── 📄 research.py              # Original Python script with LangGraph
├── 📄 requirements.txt         # Python dependencies
├── 📄 test_client.py          # API testing client
├── 🚀 start_app.sh            # One-command startup script
├── 📄 README.md               # This file
└── frontend/                   # React frontend
    ├── 📄 package.json        # Node.js dependencies
    ├── 📄 vite.config.js      # Vite configuration
    ├── 📄 tailwind.config.js  # Tailwind CSS config
    └── src/
        ├── 📄 App.jsx         # Main application component
        ├── 📄 main.jsx        # React entry point
        ├── 🎨 index.css       # Global styles with Tailwind
        ├── 🎨 App.css         # Component-specific styles
        └── components/         # React components
            ├── 📊 Dashboard.jsx    # Main dashboard
            ├── 🔍 SearchForm.jsx   # Stock search interface
            ├── 📈 StockResults.jsx # Analysis results display
            ├── 🎯 Header.jsx       # Top navigation
            ├── 📱 Sidebar.jsx      # Side navigation
            ├── ⏳ LoadingSpinner.jsx # Loading animations
            └── ❌ ErrorMessage.jsx  # Error handling
```

## 🔧 API Endpoints

### Stock Analysis
- **POST** `/analyze`
  ```json
  {
    "question": "What's the current price of AAPL stock?"
  }
  ```

### Health Checks
- **GET** `/` - Basic health check
- **GET** `/health` - Detailed status

## 🧪 Testing

### Backend Testing
```bash
# Run API tests
python test_client.py

# Interactive testing
python test_client.py interactive
```

### Frontend Development
```bash
cd frontend

# Start with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Features

- 🌑 **Dark Theme**: Optimized for extended use with blue accent colors
- 📱 **Mobile-First**: Responsive design that works on all screen sizes
- ⚡ **Performance**: Optimized animations and smooth transitions
- ♿ **Accessibility**: Keyboard navigation, screen reader support, high contrast mode
- 🎭 **Interactive**: Hover effects, loading states, and micro-interactions

## 🔄 Architecture

### Backend
- Uses **exact same research logic** from the original `research.py`
- FastAPI wrapper provides REST API interface
- Maintains all LangGraph workflow and AI analysis capabilities
- Same data sources: Tavily web search + Wikipedia + Google Gemini AI

### Frontend
- Modern React with hooks and functional components
- Tailwind CSS for styling with custom dark theme
- Component-based architecture for maintainability
- Local storage for search history and favorites
- Real-time API communication with error handling

## 🤝 Contributing

This project maintains the exact research logic from the original script while providing a modern web interface. The backend (`fastapi_research.py`) is a direct port of `research.py` with minimal changes - only adding FastAPI endpoints around the existing workflow.

## 📜 License

This project uses the same license as the original research assistant.

---

## 💡 Tips for Best Results

1. **Be Specific**: Use stock symbols (AAPL, TSLA, MSFT) for better analysis
2. **Ask Detailed Questions**: "Should I buy" gets better insights than just "price"
3. **Compare Stocks**: Ask "Compare AAPL vs MSFT" for side-by-side analysis
4. **Save Favorites**: Star important analyses to build your research library
5. **Check Sources**: Review the provided source links for additional research

**⚠️ Disclaimer**: This tool provides information and analysis for educational purposes only. It is not financial advice. Always do your own research and consult with financial professionals before making investment decisions. 