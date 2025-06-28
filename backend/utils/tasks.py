from crewai import Task 
from utils.base_models import GithubRepoDetails, GitHubRepositories, CrewResponse
from utils.agents import all_repos_agent, about_repo_agent, agent_manager, general_agent 

about_repo_task = Task(
    description="""If the question is not related to what the delegated agent can do, just pass. Here is the user question: {question}. Otherwise, the task is to retrieve general information about a project from its README file on GitHub.""",
    expected_output="A JSON object containing parsed README file content.",
    output_json=GithubRepoDetails,
    agent=about_repo_agent,
)

all_repos_task = Task(
    description="""If the question is not related to what the delegated agent can do, just pass. Here is the user question: {question}. Otherwise, the task is to fetch all repositories of the user, sorted from newest to oldest, including their URLs and creation dates.""",
    expected_output="A JSON list of repository objects, each with name, URL, and creation date.",
    output_json=GitHubRepositories,
    agent=all_repos_agent,
)

task_manager = Task(
    name="Portfolio Assistant Task",
    description="\n".join([
        "Primary Objective",
        "Provide responses ONLY about Siow Yen Chong’s portfolio and professional information. "
        "Answer the user's question: '{question}' directly and enthusiastically. "
        "Always check '{chat_history}' for continuity. Use it to avoid repeating details and reuse name/email if mentioned earlier.",
        
        "Tool Output Handling",
        "1. NEVER modify tool outputs.",
        "2. Return the output exactly as is.",
        "3. Do NOT add or guess data.",
        "4. Format emails and links with backticks: `clairechong998@gmail.com`, `[/career](/career)`.",
        
        "Scope of Responses",
        "- Education: UTAR",
        "- Work Experience: Public Bank, Finexus, UTAR RA",
        "- Projects: Emotion-Aware Agent, Sign Language Recognizer, Portfolio, etc.",
        "- Skills: Full Stack (.NET, React, SQL), Cloud (Azure, AWS, GCP), AI/ML (TensorFlow, PyTorch), Caching (Hazelcast)",
        "- Certifications & Awards: NVIDIA, AICB, Microsoft, Hackathons",
        "- Contact: [LinkedIn](https://my.linkedin.com/in/chongsiowyen), [Portfolio](https://siowyenchong.vercel.app)",
        "- Sections: `/`, `/about`, `/blog`, `/career`, `/work`, `/skills`, `/contact`",
        
        "Handling Off-Topic",
        "If unrelated to portfolio: Respond kindly and redirect. Examples:",
        " - 'I can help with Siow Yen's experience, skills, or projects. Want to explore that instead? 😊'",
        " - 'That’s outside my scope. Feel free to visit the [/career](/career) page for details!'",
        
        "Delegation Rules",
        "- Use `all_repos_agent` to get repo list with links and dates",
        "- Use `about_repo_agent` to fetch README-based project details",
        "- Use `general_agent` for anything about Siow Yen’s education, skills, certifications, awards, or contact",
        
        "Email Rules",
        "Only use agent_sender when user's full name and email are explicitly provided or found in chat history.",
        "If either is missing, return JSON with key `response` and message: 'I need your full name and email address to send the email—please provide them!'",
        
        "Tool Instructions",
        "Delegate with full context. Never refer to previous messages. Example:",
        "`task`: 'Fetch repo links for Siow Yen', `context`: 'User asked for GitHub project URLs for response.', `coworker`: 'all_repos_agent'",

        "Response Guidelines",
        "- NEVER add info not in the source/tool output",
        "- Respond in user’s language",
        "- Be friendly and simple—no hashtags or markdown styling",
        "- Always mention a matching portfolio section",
        
        "Used Technologies",
        "If user asks about tech stack, delegate to about_repo_agent with repos:",
        " - full stack: `https://github.com/SiowYenChong`"
        
        "Project Filtering",
        "If user asks about projects without specifics, return only top 5 relevant ones, not all."
    ]),
    expected_output="A JSON-formatted friendly response string",
    output_json=CrewResponse,
    agent=agent_manager
)

general_task = Task(
    description="""Respond clearly and accurately to the user's question: {question} about general info regarding Siow Yen Chong.""",
    expected_output="A string response with background or contact details.",
    agent=general_agent
)
