from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
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

# Load environment variables
load_dotenv(override=True)
os.environ["GEMINI_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["MEM0_API_KEY"] = os.getenv("MEM0_API_KEY")
os.environ['GRPC_ENABLE_FORK_SUPPORT'] = '0'
os.environ['GRPC_POLL_STRATEGY'] = 'epoll1'

# Initialize memory client
client = MemoryClient()

# FastAPI app instance
app = FastAPI(
    title="Portfolio Chatbot API",
    description="API for Siow Yen's Portfolio Chatbot",
    version="1.0.0",
    default_response_class=ORJSONResponse
)

# ✅ CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to specific domains
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

# Greeting/Goodbye Utilities
def is_greeting(text: str) -> bool:
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
    return any(text.lower().strip().startswith(greet) for greet in greetings)

def is_goodbye(text: str) -> bool:
    goodbyes = ["bye", "goodbye", "see you", "see ya"]
    return any(text.lower().strip().startswith(bye) for bye in goodbyes)

def is_chinese(text: str) -> bool:
    return any('\u4e00' <= ch <= '\u9fff' for ch in text)

# ✅ Health check route
@app.get("/health")
async def health_check():
    return {"message": "API is up and running!"}

# ✅ Main chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: Request, chat_request: ChatRequest, response: Response):
    try:
        name = "张晓燕" if is_chinese(chat_request.question) else "Siow Yen"

        if is_greeting(chat_request.question):
            return ChatResponse(response=(
                f"你好，我是{name}的 AI 助手。请问有什么我可以帮忙的？" if is_chinese(chat_request.question)
                else f"Hi there! I'm the AI assistant of {name}. How can I help you today?"
            ))

        if is_goodbye(chat_request.question):
            return ChatResponse(response=(
                "再见！期待下次再与您交流！" if is_chinese(chat_request.question)
                else "Goodbye! Have a great day! Feel free to come back if you have more questions."
            ))

        # Set user_id in cookies if not set
        user_id = request.cookies.get("user_id")
        if not user_id:
            user_id = str(uuid.uuid4())
            response.set_cookie(
                key="user_id",
                value=user_id,
                httponly=True,
                max_age=259200,
                path="/",
                samesite="none",
                secure=True
            )

        # Get user memory
        all_memories = client.get_all(user_id=user_id, output_format="v1.1")
        memory = get_first_10_memories(all_memories)

        # Run crew process
        crew_response = crew.kickoff(inputs={
            "question": chat_request.question,
            "chat_history": memory
        })

        final_response = " ".join(crew_response["response"].split("\n"))
        client.add(
            [{"role": "user", "content": chat_request.question},
             {"role": "assistant", "content": final_response}],
            user_id=user_id, output_format="v1.1"
        )

        return ChatResponse(response=final_response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Remove OPTIONS handler (CORS middleware handles it automatically)
# If absolutely necessary, you could enable this but it’s usually not needed:
# @app.options("/chat")
# async def options_chat():
#     return JSONResponse(status_code=200, content={"message": "CORS preflight success"})

# ✅ Optional: Get chat history
@app.get("/chat-history/{user_id}")
async def get_chat_history(user_id: str):
    try:
        all_memories = client.get_all(user_id=user_id, output_format="v1.1")
        return {"history": all_memories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Local development only
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app=app, host="0.0.0.0", port=8000, reload=True)
