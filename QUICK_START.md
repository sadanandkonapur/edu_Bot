# Edu Academy Chatbot - Quick Start Guide

## What I've Built For You

I've created a complete **Educational AI Chatbot** application with the following features:

### 🎯 Key Features
1. **Interactive AI Chat Interface** - Students can chat with an AI tutor
2. **Subject-Specific Questions** - Choose from various academic subjects
3. **Study Plan Generator** - Creates personalized study plans
4. **Quick Action Buttons** - Pre-built educational queries
5. **Modern Web Interface** - Responsive design with Bootstrap 5

### 📁 Project Structure
```
edu-academy-bot/
├── main.py              # FastAPI backend application
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (configure your OpenAI key here)
├── .env.example        # Template for environment variables
├── README.md           # Detailed documentation
├── install.bat         # Windows installation script
├── run.bat            # Windows run script
├── templates/
│   └── index.html     # Main web interface
└── static/
    ├── style.css      # Custom styling
    └── script.js      # Frontend JavaScript
```

### 🚀 How to Get Started

#### Step 1: Get an OpenAI API Key
1. Go to https://platform.openai.com/
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it in Step 3)

#### Step 2: Install Dependencies
**Option A: Use the install script (Recommended)**
- Double-click `install.bat` in the project folder
- Follow the prompts

**Option B: Manual installation**
```bash
# Open PowerShell/Command Prompt in the project folder
python -m pip install -r requirements.txt
```

#### Step 3: Configure Your API Key
1. Open the `.env` file in a text editor
2. Replace `your_openai_api_key_here` with your actual OpenAI API key
3. Save the file

#### Step 4: Run the Application
**Option A: Use the run script (Recommended)**
- Double-click `run.bat`

**Option B: Manual run**
```bash
# Open PowerShell/Command Prompt in the project folder
python main.py
```

#### Step 5: Access the Application
- Open your web browser
- Go to: http://localhost:8000
- Start chatting with your AI tutor!

### 💡 Usage Examples

#### Chat Interface
- Type: "Explain photosynthesis in simple terms"
- Type: "Help me solve quadratic equations"
- Type: "What are good study techniques for exams?"

#### Subject-Specific Questions
- Select "Mathematics" and ask: "How do I find the derivative of x²?"
- Select "Science" and ask: "What is the periodic table?"

#### Study Plan Generator
- Subject: Mathematics
- Level: High School
- Duration: 2 weeks
- Click "Generate Study Plan"

### 🛠️ Technical Details

#### Backend (FastAPI)
- Modern Python web framework
- RESTful API endpoints
- OpenAI GPT-3.5-turbo integration
- Async/await support for better performance

#### Frontend
- Clean, responsive HTML5/CSS3/JavaScript
- Bootstrap 5 for styling
- Font Awesome icons
- Real-time chat interface

#### API Endpoints
- `GET /` - Main chat interface
- `POST /chat` - Send chat messages
- `POST /ask-question` - Subject-specific questions
- `POST /study-plan` - Generate study plans
- `GET /subjects` - Get available subjects
- `GET /health` - Health check

### 🔧 Customization Options

#### Add New Subjects
Edit the `get_subjects()` function in `main.py`

#### Modify AI Behavior
Update the `EDUCATIONAL_CONTEXT` variable in `main.py`

#### Change Styling
Modify `static/style.css` for custom appearance

#### Add Features
- User authentication
- Database integration
- File upload for homework help
- Voice chat capabilities

### 🐛 Troubleshooting

#### Common Issues:

1. **"Module not found" errors**
   - Make sure you ran `pip install -r requirements.txt`

2. **"Invalid API key" error**
   - Check your OpenAI API key in the `.env` file
   - Ensure you have credits in your OpenAI account

3. **"Port already in use"**
   - Change the port in `main.py` (line 201) or close other applications using port 8000

4. **Slow responses**
   - Check your internet connection
   - Verify OpenAI API status

### 📞 Support
If you encounter any issues:
1. Check the troubleshooting section above
2. Review the README.md file for detailed documentation
3. Ensure all dependencies are properly installed

### 🎓 Educational Use Cases
This chatbot is perfect for:
- Homework assistance
- Concept explanations
- Study planning
- Test preparation
- Learning new subjects
- Getting quick answers to academic questions

**Your Edu Academy Chatbot is ready to help students learn and succeed!** 🎉
