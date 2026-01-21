#!/bin/bash

# LedgerIQ - Quick Start Script
# This script makes it easy to start the development server

echo "🚀 Starting LedgerIQ..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp .env.example .env
    echo "✅ Created .env file. The app will run with mock data."
    echo ""
fi

echo "🎨 Starting development server..."
echo "📱 Open http://localhost:3000 in your browser"
echo ""
echo "💡 Tip: Press Ctrl+C to stop the server"
echo ""

npm run dev
