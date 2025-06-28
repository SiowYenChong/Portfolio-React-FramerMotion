from dotenv import load_dotenv
import os

load_dotenv()

print("GITHUB_TOKEN:", os.getenv("GITHUB_TOKEN"))
print("GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))
print("GMAIL_APP_PASSWORD:", os.getenv("GMAIL_APP_PASSWORD"))
print("QDRANT_URL:", os.getenv("QDRANT_URL"))
print("QDRANT_API_KEY:", os.getenv("QDRANT_API_KEY"))
