#!/bin/bash
# Safe setup script for GitHub users

echo "🚀 Setting up Edu Academy Chatbot..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.template .env
    echo "✅ .env file created!"
    echo "⚠️  IMPORTANT: Edit .env file and add your API keys!"
    echo "   - Get Google Gemini key: https://makersuite.google.com/app/apikey"
else
    echo "✅ .env file already exists"
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements_gemini.txt

echo "🎉 Setup complete!"
echo "📝 Next steps:"
echo "   1. Edit .env file and add your API keys"
echo "   2. Run: python main_gemini.py"
echo "   3. Open: http://localhost:8000"
