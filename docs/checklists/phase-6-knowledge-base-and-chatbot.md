# Phase 6: Knowledge Base & Chatbot

Provide a self-service portal for customers and an AI-driven chatbot that can answer common questions.

1. [ ] BACKEND: Create knowledge_base.py endpoints for articles (CRUD).  
2. [ ] BACKEND: Store knowledge base content in Supabase or use a separate markdown approach if desired.  
3. [ ] BACKEND: Implement an ai_endpoints.py route that uses LangChain or an LLM to answer queries referencing the knowledge base.  
4. [ ] FRONTEND: Add a KnowledgeBase page listing articles with a search bar.  
5. [ ] FRONTEND: Integrate a ChatbotUI or real-time chat widget pointing to the ai_endpoints for quick Q&A.  
6. [ ] FRONTEND: Flow -> “Ask Chatbot → If not solved, Show ‘Create Ticket?’ prompt.”  
7. [ ] FRONTEND: Provide basic error handling if the AI endpoint times out or fails.  

References:  
• @product-requirements.md (knowledge base, AI chat)  
• @tech-stack-rules.md (LangChain & FastAPI usage)  
• @important-considerations.md (real-time subscription not needed here, but could enhance chat)  
• @ui-rules.md (desktop-first design, easily collapsible chat widget)
