from crewai.crew import Knowledge
from crewai.knowledge.source.json_knowledge_source import JSONKnowledgeSource
from crewai.knowledge.source.pdf_knowledge_source import PDFKnowledgeSource

knowledges = []

# Create a JSON knowledge source with updated metadata
json_source = JSONKnowledgeSource(
    file_paths=["../knowledge/general_data.json"],
    chunk_size=1000,
    chunk_overlap=200,
    metadata={
        "source_type": "JSON",
        "description": "Personal and professional data of Chong Siow Yen",
        "author": "Chong Siow Yen",
        "location": "Selangor, Malaysia",
        "role": "Full-Stack Software Engineer",
        "education": "Universiti Tunku Abdul Rahman (BS)",
        "RESUME / CV": "resume link of Siow Yen",
        "skills": [
            "C#", ".NET Core", "Blazor", "JavaScript", "ReactJS", "Python",
            "Spring Boot", "SQL Server", "Azure", "Docker", "Git", 
            "Machine Learning", "Transformers", "RAG", "Vector Embeddings", "Hugging Face", "AI Agents"
        ],
        "services": [
            "Cloud-Native Web Development", 
            "AI & LLM Applications", 
            "Enterprise Software Solutions", 
            "System Integration", 
            "DevOps & CI/CD", 
            "Data Engineering & Analysis", 
            "Database Design & Optimization"
        ],
    }
)
knowledges.append(json_source)

# Create a PDF knowledge source with detailed metadata
pdf_source = PDFKnowledgeSource(
    file_paths=["../knowledge/MY_RESUME.pdf"],
    chunk_size=500,
    chunk_overlap=20,
    metadata={
        "description": "Resume of Chong Siow Yen - Full-Stack Software Engineer",
        "author": "Chong Siow Yen",
        "location": "Selangor, Malaysia",
        "education": "Universiti Tunku Abdul Rahman",
        "skills": [
            "C#", ".NET Core", "Blazor", "Python", "Spring Boot", "SQL Server",
            "Azure", "Git", "Docker", "JavaScript", "React", 
            "Machine Learning", "Transformers", "AI Agents"
        ],
    }
)

knowledges.append(pdf_source)
