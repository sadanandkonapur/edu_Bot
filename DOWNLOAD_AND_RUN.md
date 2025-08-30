# 📦 Quick Start Guide for ZIP Download

## 🚀 How to Run This Project After Downloading ZIP

### **Prerequisites**
- Python 3.8 or higher installed on your computer
- Internet connection for downloading dependencies

### **Step-by-Step Setup**

#### **1. Extract the ZIP file**
- Download and extract the ZIP file to any folder on your computer
- Navigate to the extracted folder

#### **2. Set up your API key**
- Copy `.env.template` to `.env`:
  ```bash
  # On Windows
  copy .env.template .env
  
  # On Mac/Linux  
  cp .env.template .env
  ```
- Edit the `.env` file and add your Google Gemini API key:
  ```
  GOOGLE_API_KEY=your_actual_api_key_here
  ```

#### **3. Get your Google Gemini API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in your `.env` file

#### **4. Install dependencies**
**Option A - Easy Setup (Recommended):**
- **Windows**: Double-click `setup.bat`
- **Mac/Linux**: Run `bash setup.sh`

**Option B - Manual Setup:**
```bash
pip install -r requirements_gemini.txt
```

#### **5. Run the application**
**Option A - Easy Run:**
- **Windows**: Double-click `run.bat`

**Option B - Manual Run:**
```bash
python main_gemini.py
```

#### **6. Access your chatbot**
- Open your web browser
- Go to: `http://localhost:8000`
- Start chatting with your AI tutor!

### **🔧 Troubleshooting**

#### **Common Issues:**

1. **Python not found**
   - Install Python from [python.org](https://python.org)
   - Make sure to check "Add Python to PATH" during installation

2. **Dependencies installation fails**
   - Update pip: `python -m pip install --upgrade pip`
   - Retry: `pip install -r requirements_gemini.txt`

3. **API key error**
   - Make sure your `.env` file exists
   - Verify your Google Gemini API key is correct
   - Check that there are no extra spaces in the `.env` file

4. **Port already in use**
   - Change the PORT in `.env` file (e.g., `PORT=8001`)
   - Or stop any other applications using port 8000

### **📁 What's Included**

- `main_gemini.py` - Main application file
- `templates/` - Web interface templates
- `static/` - CSS and JavaScript files
- `requirements_gemini.txt` - Python dependencies
- `.env.template` - Configuration template
- `setup.bat` / `setup.sh` - Easy setup scripts
- `run.bat` - Easy run script for Windows
- Documentation files (README.md, etc.)

### **🎯 Features You'll Get**

- AI-powered educational chatbot
- Subject-specific tutoring
- Study plan generation
- Interactive web interface
- Multiple question types support

### **🆘 Need Help?**

Check the following files for more information:
- `README.md` - Complete documentation
- `SECURITY.md` - Security best practices
- `QUICK_START.md` - Additional setup guidance

**Your AI tutor is ready to help with your studies!** 🎓
