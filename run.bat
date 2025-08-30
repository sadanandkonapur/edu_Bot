@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo Starting Edu Academy Chatbot (Gemini)...

if not exist .venv (
  py -3 -m venv .venv || python -m venv .venv
)
call .venv\Scripts\activate.bat

python -m pip install --upgrade pip
python -m pip install -r requirements_gemini.txt

if not exist .env (
  echo Creating .env template...
  > .env echo GOOGLE_API_KEY=your_gemini_api_key_here
  >> .env echo APP_NAME=Edu Academy Chatbot
  >> .env echo APP_VERSION=1.0.0
  >> .env echo DEBUG=True
  >> .env echo HOST=0.0.0.0
  >> .env echo PORT=8000
  echo Edit .env and set GOOGLE_API_KEY.
  pause
  exit /b 1
)

setlocal
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
  if /I "%%~A"=="GOOGLE_API_KEY" set "GOOGLE_API_KEY=%%~B"
)
if not defined GOOGLE_API_KEY (
  echo ERROR: GOOGLE_API_KEY missing in .env
  pause
  exit /b 1
)

echo Launching server at http://localhost:8000 ...
python main_gemini.py
