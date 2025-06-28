from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse, JSONResponse
from utils.base_models import ChatRequest, ChatResponse
from crewai import Crew, Process
from utils.agents import all_repos_agent, about_repo_agent, agent_manager, general_agent, agent_sender
from utils.tasks import task_manager
from utils.memory import get_first_10_memories
from mem0 import MemoryClient
from utils.model import planner
import os
from dotenv import load_dotenv
import uuid

# Load environment
load_dotenv(override=True)
os.environ["GEMINI_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["MEM0_API_KEY"] = os.getenv("MEM0_API_KEY")
os.environ['GRPC_ENABLE_FORK_SUPPORT'] = '0'
os.environ['GRPC_POLL_STRATEGY'] = 'epoll1'

# Init memory client
client = MemoryClient()

# FastAPI app
app = FastAPI(
    title="Portfolio Chatbot API",
    description="API for Siow Yen's Portfolio Chatbot",
    version="1.0.0",
    default_response_class=ORJSONResponse
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "https://siowyenchong.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crew setup
crew = Crew(
    agents=[all_repos_agent, about_repo_agent, general_agent, agent_sender, agent_manager],
    tasks=[task_manager],
    process=Process.sequential,
    verbose=True,
    planning=True,
    planning_llm=planner,
)

# Utility checks
def is_greeting(text: str) -> bool:
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hi there", "hello there", "salam", "marhba"]
    return any(text.lower().strip().startswith(greeting) for greeting in greetings)

def is_goodbye(text: str) -> bool:
    goodbyes = ["bye", "goodbye", "see you", "see ya", "bslama", "beslama", "au revoir"]
    return any(text.lower().strip().startswith(goodbye) for goodbye in goodbyes)

def is_chinese(text: str) -> bool:
    return any('\u4e00' <= ch <= '\u9fff' for ch in text)

@app.get("/health")
async def health_check():
    return {"message": "API is up and running!"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: Request, chat_request: ChatRequest, response: Response):
    try:
        # Name localization
        name = "张晓燕" if is_chinese(chat_request.question) else "Siow Yen"

        # Handle greetings
        if is_greeting(chat_request.question):
            return ChatResponse(response=(
                f"你好，我是{name}的 AI 助手。请问有什么我可以帮忙的？" if is_chinese(chat_request.question)
                else f"Hi there! I'm the AI assistant of {name}. How can I help you today?"
            ))

        # Handle goodbyes
        if is_goodbye(chat_request.question):
            return ChatResponse(response=(
                "再见！期待下次再与您交流！" if is_chinese(chat_request.question)
                else "Goodbye! Have a great day! Feel free to come back if you have more questions."
            ))

        # Cookie handling
        user_id = request.cookies.get("user_id")
        if not user_id:
            user_id = str(uuid.uuid4())
            response.set_cookie(
                key="user_id",
                value=user_id,
                httponly=True,
                max_age=259200,  # 3 days
                path="/",
                samesite="none",
                secure=True
            )

        # Retrieve memory
        all_memories = client.get_all(user_id=user_id, output_format="v1.1")
        memory = get_first_10_memories(all_memories)

        # Run Crew
        crew_response = crew.kickoff(inputs={
            "question": chat_request.question,
            "chat_history": memory,
        })

        resp = " ".join(crew_response["response"].split("\n"))
        messages = [
            {"role": "user", "content": chat_request.question},
            {"role": "assistant", "content": resp}
        ]
        client.add(messages, user_id=user_id, output_format="v1.1")

        return ChatResponse(response=resp)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.options("/chat")
async def options_chat():
    return JSONResponse(status_code=200, content={"message": "CORS preflight success"})

@app.get("/chat-history/{user_id}")
async def get_chat_history(user_id: str):
    try:
        all_memories = client.get_all(user_id=user_id, output_format="v1.1")
        return {"history": all_memories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app=app, host="0.0.0.0", port=8000, reload=True)
