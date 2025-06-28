import os
from dotenv import load_dotenv
from langchain_qdrant import QdrantVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from crewai.tools import tool
from pydantic import Field

# Load environment variables
load_dotenv(override=True)

# Environment validation
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")

if not all([qdrant_url, qdrant_api_key, google_api_key]):
    raise ValueError("Missing environment variables for Qdrant or Google API")

# Initialize embedding model
try:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        task_type="semantic_similarity",
        google_api_key=google_api_key
    )
except Exception as e:
    print(f"[ERROR] Failed to initialize embeddings: {str(e)}")
    raise

# Initialize Qdrant client
try:
    qdrant_client = QdrantClient(
        url=qdrant_url,
        api_key=qdrant_api_key,
        prefer_grpc=False
    )
except Exception as e:
    print(f"[ERROR] Failed to connect to Qdrant: {str(e)}")
    raise

# Ensure collection exists
try:
    existing_collections = [col.name for col in qdrant_client.get_collections().collections]
    if "portfolio_data" not in existing_collections:
        print("Creating collection 'portfolio_data'...")
        qdrant_client.create_collection(
            collection_name="portfolio_data",
            vectors_config=VectorParams(
                size=768,
                distance=Distance.COSINE
            )
        )
    else:
        print("[OK] Collection 'portfolio_data' already exists.")
except Exception as e:
    print(f"[ERROR] Failed to create or check collection: {str(e)}")
    raise

# Initialize vector store
try:
    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name="portfolio_data",
        embedding=embeddings
    )
except Exception as e:
    print(f"[ERROR] Failed to initialize vector store: {str(e)}")
    raise

retriever = vector_store.as_retriever(search_kwargs={"k": 8})

# Utility: Detect Chinese characters
def contains_chinese(text: str) -> bool:
    return any('\u4e00' <= ch <= '\u9fff' for ch in text)

# Utility: Return name in correct language
def get_display_name(text: str) -> str:
    return "张晓燕" if contains_chinese(text) else "Chong Siow Yen"

# Tool for CrewAI
@tool
def general_info_retriever(query: str = Field(
    description="A statement-form query about Chong Siow Yen (张晓燕)'s portfolio (e.g., 'Siow Yen's experience')"
)) -> str:
    """
    Uses semantic search to retrieve relevant documents about Siow Yen.

    Args:
        query (str): The input query in statement form.

    Returns:
        str: Relevant content snippets and metadata.
    """
    if not query or not isinstance(query, str):
        raise ValueError("Query must be a non-empty string")

    try:
        docs = retriever.invoke(query)

        if not docs:
            return f"未找到关于 {get_display_name(query)} 的相关信息。" if contains_chinese(query) \
                   else f"No relevant information found for {get_display_name(query)}."

        output = f"\n📄 关于 {get_display_name(query)} 的信息:\n" if contains_chinese(query) \
                 else f"\n📄 Retrieved Documents about {get_display_name(query)}:\n"
        
        for i, doc in enumerate(docs, 1):
            output += f"\n--- Document {i} ---\n"
            output += f"Content:\n{doc.page_content.strip()}\n"
            output += f"Metadata:\n{doc.metadata}\n"

        return output

    except Exception as e:
        raise RuntimeError(f"[ERROR] Retrieval failed: {str(e)}")
