# Edu Academy Chatbot

A comprehensive educational AI chatbot built with FastAPI and modern web technologies. This application serves as an AI-powered tutor that helps students with various academic subjects, study planning, and learning assistance.

## Features

- 🤖 **AI-Powered Chat**: Interactive chatbot for educational assistance
- 📚 **Subject-Specific Help**: Support for various academic subjects
- 📅 **Study Plan Generation**: Personalized study plans based on subject, level, and duration
- 🎯 **Quick Actions**: Pre-defined educational queries for common topics
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- 🔧 **FastAPI Backend**: High-performance Python web framework

## Technologies Used

- **Backend**: FastAPI, Python 3.8+
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **AI**: Google Gemini AI
- **Templates**: Jinja2
- **Styling**: Bootstrap 5, Font Awesome icons

## Installation

### **Option 1: Download ZIP (Easiest)**
1. Download this project as a ZIP file from GitHub
2. Extract to any folder on your computer
3. Follow the guide in `DOWNLOAD_AND_RUN.md`

### **Option 2: Git Clone**
1. **Clone** the repository:
   ```bash
   git clone https://github.com/DheerajPanyam45/sadanand.git
   cd sadanand
   ```

2. **Install Python** (3.8 or higher) if not already installed

3. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

4. **Activate the virtual environment**:
   - Windows:
     ```bash
     venv\\Scripts\\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

5. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

6. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to the `.env` file:
     ```bash
     GOOGLE_API_KEY=your_actual_gemini_api_key_here
     ```
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```

## Getting Your OpenAI API Key

1. Go to [OpenAI's website](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to the API section
4. Generate a new API key
5. Copy the key and add it to your `.env` file

## Running the Application

1. **Start the server**:
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

## Usage

### Chat Interface
- Type questions in the chat input field
- Get instant responses from the AI tutor
- Conversation history is maintained during the session

### Quick Actions
- Use pre-defined buttons for common educational topics
- Science help, Math problems, Study tips, Writing assistance

### Subject-Specific Questions
- Select a specific subject from the dropdown
- Ask targeted questions for better context

### Study Plan Generation
- Choose subject, academic level, and duration
- Generate personalized study plans with objectives and materials

## API Endpoints

- `GET /` - Main chat interface
- `POST /chat` - Send chat messages to AI
- `POST /ask-question` - Submit subject-specific questions
- `POST /study-plan` - Generate study plans
- `GET /subjects` - Get available subjects
- `GET /health` - Health check endpoint

## Project Structure

```
edu-academy-bot/
│
├── main.py                 # FastAPI application
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── README.md              # Project documentation
│
├── templates/
│   └── index.html         # Main web interface
│
└── static/
    ├── style.css          # Custom styles
    └── script.js          # Frontend JavaScript
```

## Customization

### Adding New Subjects
Edit the `get_subjects()` function in `main.py` to add more academic subjects.

### Modifying AI Behavior
Update the `EDUCATIONAL_CONTEXT` variable in `main.py` to change how the AI responds.

### Styling Changes
Modify `static/style.css` to customize the appearance of the application.

### Additional Features
- Add user authentication
- Implement conversation persistence with a database
- Add file upload for homework help
- Include voice chat capabilities

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure your API key is correctly set in the `.env` file
   - Check that you have sufficient credits in your OpenAI account

2. **Module Not Found Error**
   - Make sure you've activated your virtual environment
   - Install all requirements: `pip install -r requirements.txt`

3. **Port Already in Use**
   - Change the port in `main.py` or kill the process using port 8000

4. **Slow Responses**
   - Check your internet connection
   - Verify OpenAI API status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please create an issue in the project repository.

---

**Edu Academy Chatbot** - Empowering education through AI technology.
