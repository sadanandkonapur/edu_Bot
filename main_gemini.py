from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = FastAPI(title="Edu Academy Chatbot", description="Educational AI Assistant (Gemini)")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)

EDUCATIONAL_CONTEXT = (
    "You are an AI tutor for Edu Academy. Be clear, step-by-step, and supportive."
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/health")
async def health_check():
    return {"status": "healthy", "provider": "Gemini", "key": bool(GOOGLE_API_KEY)}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest):
    if not GOOGLE_API_KEY:
        raise HTTPException(500, "GOOGLE_API_KEY not configured in .env")

    # Build prompt with context and (last few) history turns
    history_text = "\n".join([f"{m.role.capitalize()}: {m.content}" for m in (payload.conversation_history or [])][-4:])
    prompt = f"""{EDUCATIONAL_CONTEXT}\n\n{history_text}\nStudent: {payload.message}\nTutor:"""

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        resp = model.generate_content(prompt)
        text = resp.text or ""
        if not text.strip():
            text = "I couldn't get a response right now. Please try again."
        return ChatResponse(response=text.strip())
    except Exception as e:
        raise HTTPException(500, f"Gemini API error: {e}")

@app.post("/ask-question")
async def ask_question(question: str = Form(...), subject: str = Form("General")):
    if not GOOGLE_API_KEY:
        return JSONResponse({"success": False, "error": "GOOGLE_API_KEY not set"}, status_code=500)
    prompt = f"{EDUCATIONAL_CONTEXT}\nSubject: {subject}\nQuestion: {question}\nAnswer clearly:"
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        resp = model.generate_content(prompt)
        return {"success": True, "response": (resp.text or "").strip(), "subject": subject}
    except Exception as e:
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
