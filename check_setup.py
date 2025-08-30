import sys
from pathlib import Path

def check_requirements():
    """Check Gemini setup for Edu Academy Chatbot"""
    print("🔍 Checking Edu Academy Chatbot (Gemini) setup...")

    pv = sys.version_info
    print(f"✅ Python version: {pv.major}.{pv.minor}.{pv.micro}")
    if pv < (3, 8):
        print("❌ Python 3.8+ required")
        return False

    # Required files
    required_files = [
        "main_gemini.py",
        "requirements_gemini.txt",
        "templates/index.html",
        "static/style.css",
        "static/script.js",
        ".env",
    ]
    ok = True
    for f in required_files:
        if Path(f).exists():
            print(f"✅ {f} found")
        else:
            print(f"❌ {f} missing")
            ok = False
    if not ok:
        return False

    # .env must have GOOGLE_API_KEY
    content = Path('.env').read_text(encoding='utf-8', errors='ignore')
    has_key = 'GOOGLE_API_KEY=' in content and 'your_gemini_api_key_here' not in content
    if has_key:
        print("✅ GOOGLE_API_KEY appears configured")
    else:
        print("❌ GOOGLE_API_KEY missing or placeholder in .env")
        return False

    # Imports
    try:
        import fastapi  # noqa: F401
        import uvicorn  # noqa: F401
        import dotenv   # noqa: F401
        import pydantic # noqa: F401
        import jinja2   # noqa: F401
        import aiofiles # noqa: F401
        import multipart  # python-multipart # noqa: F401
        import google.generativeai as _  # noqa: F401
        print("✅ All required packages for Gemini are installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("💡 Run: pip install -r requirements_gemini.txt")
        return False

    print("\n🎉 Setup check complete! Your Gemini bot is ready to run.")
    return True

if __name__ == "__main__":
    if check_requirements():
        print("\n🚀 To start: run.bat (or: python main_gemini.py)")
        print("🌐 Then open: http://localhost:8000")
    else:
        print("\n❌ Setup incomplete. Please fix the issues above.")
        sys.exit(1)
