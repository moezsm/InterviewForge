#!/usr/bin/env bash
set -euo pipefail

echo "============================================"
echo "  InterviewForge — Local Setup Script"
echo "============================================"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed."
  echo "   Please install Node.js 18+ from https://nodejs.org"
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18+ is required. You have $(node -v)."
  exit 1
fi
echo "✅ Node.js $(node -v) detected"

# Check for npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed."
  exit 1
fi
echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo ""
  echo "📄 Creating .env.local from .env.example..."
  cp .env.example .env.local
  echo "   Edit .env.local with your Supabase credentials (optional)."
else
  echo ""
  echo "📄 .env.local already exists — skipping."
fi

# Run build to validate everything compiles
echo ""
echo "🔨 Running build to verify setup..."
npm run build

echo ""
echo "============================================"
echo "  ✅ Setup complete!"
echo "============================================"
echo ""
echo "  Start the development server:"
echo "    npm run dev"
echo ""
echo "  Then open http://localhost:3000"
echo ""
echo "  Quick links:"
echo "    Home:             http://localhost:3000"
echo "    Admin Categories: http://localhost:3000/admin/categories"
echo "    Admin Questions:  http://localhost:3000/admin/questions"
echo ""
