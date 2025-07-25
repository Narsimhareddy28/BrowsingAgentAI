#!/bin/bash

# Stock Research Assistant - Start Script
echo "🚀 Starting Stock Research Assistant..."
echo "======================================="

# Check if Python FastAPI dependencies are installed
echo "📦 Checking backend dependencies..."
if ! python3 -c "import fastapi, uvicorn" 2>/dev/null; then
    echo "❌ Backend dependencies missing. Installing..."
    pip install -r requirements.txt
fi

# Check if Node.js frontend dependencies are installed
echo "📦 Checking frontend dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ Frontend dependencies missing. Installing..."
    cd frontend && npm install && cd ..
fi

# Function to start backend
start_backend() {
    echo "🔧 Starting FastAPI backend on port 8000..."
    python fastapi_research.py &
    BACKEND_PID=$!
    echo "✅ Backend started (PID: $BACKEND_PID)"
}

# Function to start frontend
start_frontend() {
    echo "🌐 Starting React frontend on port 5173..."
    cd frontend && npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
}

# Start both services
start_backend
sleep 3  # Give backend time to start
start_frontend

echo ""
echo "🎉 Stock Research Assistant is running!"
echo "======================================="
echo "📊 Backend API: http://localhost:8000"
echo "🌐 Frontend UI: http://localhost:5173"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both services"

# Function to cleanup when script is terminated
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend stopped"
    fi
    echo "👋 Goodbye!"
    exit 0
}

# Trap Ctrl+C and cleanup
trap cleanup SIGINT

# Wait for user to stop the script
wait 