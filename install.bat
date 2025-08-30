@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo Installing Edu Academy Chatbot (Gemini)...

echo Checking Python...
where py >nul 2>&1
if %ERRORLEVEL%==0 (
  set "PY=py -3"
) else (
  where python >nul 2>&1 || (
    echo Error: Python 3.8+ not found in PATH. Install from https://python.org
    pause & exit /b 1
  )
  set "PY=python"
)

if not exist .venv (
  echo Creating virtual environment...
  %PY% -m venv .venv || (
    echo Failed to create venv. Ensure Python is installed correctly.
    pause & exit /b 1
  )
)

echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing dependencies (Gemini)...
python -m pip install -r requirements_gemini.txt

if not exist .env (
  echo Creating .env file...
  > .env echo GOOGLE_API_KEY=your_gemini_api_key_here
  >> .env echo APP_NAME=Edu Academy Chatbot
  >> .env echo APP_VERSION=1.0.0
  >> .env echo DEBUG=True
  >> .env echo HOST=0.0.0.0
  >> .env echo PORT=8000
  echo.
  echo IMPORTANT: Open .env and set your GOOGLE_API_KEY (Gemini).
  echo Get a key at: https://ai.google.dev/
  echo.
)

echo.
echo Installation complete!
echo Next steps:
echo 1. Edit .env and set GOOGLE_API_KEY
echo 2. Run: run.bat (or: python main_gemini.py)
echo 3. Open http://localhost:8000
pause
