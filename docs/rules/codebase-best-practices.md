# Codebase Best Practices

This document outlines the folder structure, file naming conventions, and overarching guidelines to maintain a scalable, AI-first codebase for AutoCRM. It references the insights from our Tech Stack, Tech Stack Rules, UI Rules, and Theme Rules to ensure consistency and clarity across the entire project.

---

## 1. Codebase Principles

1. Modular & Scalable: The codebase should be organized into logical parts (e.g., frontend, backend, shared libraries), each with a well-defined purpose.  
2. Readability: Keep files under 250 lines to improve navigability and assist AI tooling. Split large functionalities into smaller modules or subfiles where necessary.  
3. Documentation & Comments:  
   • Each file begins with an explanation of its contents or purpose.  
   • Each function includes proper documentation (JSDoc, TSDoc, or an equivalent style) describing parameters, return types, and functionality.  
4. Consistent Naming: Use clear, descriptive names, following conventions for files, folders, and components.  
5. AI-First Approach: Maintain well-defined interfaces and separated concerns so AI-driven features (like LLM-based functionality or vector searches) are injected cleanly.

---

## 2. Folder Structure

Below is a recommended file tree. Depending on your deployment or scaling needs, you may adjust or create additional layers, but this structure covers typical concerns for an AI-first CRM application.

└── auto-crm/  
    ├── docs/  
    │   ├── project-info/  
    │   │   ├── project-overview.md  
    │   │   ├── user-flow.md  
    │   │   ├── product-requirements.md  
    │   │   ├── tech-stack.md  ← (Chosen Tech Stack)  
    │   │   └── …  
    │   └── new-project-setup.md  
    ├── rules/  
    │   ├── tech-stack-rules.md  
    │   ├── ui-rules.md  
    │   ├── theme-rules.md  
    │   └── codebase-best-practices.md  ← (This file)  
    ├── src/  
    │   ├── frontend/  
    │   │   ├── components/  
    │   │   │   ├── Button.tsx  
    │   │   │   ├── TicketCard.tsx  
    │   │   │   └── …  
    │   │   ├── pages/  
    │   │   │   ├── Dashboard.tsx  
    │   │   │   ├── AdminPanel.tsx  
    │   │   │   └── …  
    │   │   ├── hooks/  
    │   │   │   ├── useAuthStore.ts  ← Zustand store for auth  
    │   │   │   ├── useTicketStore.ts  
    │   │   │   └── …  
    │   │   ├── styles/  
    │   │   │   └── globals.css  ← Base Tailwind or Shadcn overrides  
    │   │   ├── main.tsx  
    │   │   └── vite.config.ts  
    │   ├── backend/  
    │   │   ├── api/  
    │   │   │   ├── auth.py          ← FastAPI routes for auth  
    │   │   │   ├── tickets.py       ← Ticket endpoints  
    │   │   │   └── ai_endpoints.py  ← LangChain or LLM endpoints  
    │   │   ├── services/  
    │   │   │   ├── auth_service.py  ← Handles Supabase Auth logic  
    │   │   │   ├── ai_service.py    ← Calls LangChain, vector store queries  
    │   │   │   └── ticket_service.py  
    │   │   ├── models/  
    │   │   │   ├── database.py      ← Supabase Postgres config  
    │   │   │   └── schemas.py       ← Pydantic models for input/output  
    │   │   ├── main.py              ← FastAPI initialization  
    │   │   └── requirements.txt  
    │   ├── shared/  
    │   │   ├── utils/  
    │   │   │   ├── dateUtils.ts     ← Example utilities (TypeScript if needed)  
    │   │   │   └── formatting.ts  
    │   │   ├── constants.ts         ← Any global constants (e.g., status enums, config keys)  
    │   │   └── types/               ← Shared TypeScript types  
    │   └── index.md (optional)  
    ├── .env                         ← Environment variables (do not commit secrets)  
    ├── package.json / yarn.lock     ← Frontend dependencies  
    ├── requirements.txt / pyproject.toml (Backend dependencies)  
    └── README.md  

**Key Points About This Structure:**  
• The frontend is under "src/frontend" and is built with Vite, React, Tailwind, Shadcn, and Zustand.  
• Shadcn UI/Radix-based components live in "components." Hooks (including Zustand stores) go in "hooks."  
• The backend is under "src/backend" and uses FastAPI for microservices (e.g., authentication, tickets, AI endpoints), referencing Supabase Postgres.  
• Shared utilities or types that might be used on both the frontend and backend can be placed in "src/shared/."

---

## 3. File Naming Conventions

1. Lowercase and kebab-case for folders (e.g., "services," "models," "api").  
2. PascalCase for React components (e.g., "TicketCard.tsx").  
3. snake_case for Python files (e.g., "auth_service.py").  
4. Consistent suffixes:  
   • *.service.* for service-layer code.  
   • *.store.* or "use*.ts" for Zustand stores.  
   • *.test.* or *.spec.* for test files.  

---

## 4. File Headers & Documentation

1. At the top of each file, include a brief comment explaining its purpose. Example (TypeScript):

   /*
   --------------
   File: TicketCard.tsx
   Description: Renders an individual ticket card, displaying key details (title, priority, status).
   --------------
   */

2. For functions, use JSDoc or TSDoc. Example (TypeScript):

   /**
    * createTicket - creates a new ticket in Supabase.
    * @param {string} subject - The ticket subject.
    * @param {string} description - Detailed description of the issue.
    * @returns {Promise<Ticket>} The newly created ticket object.
    */

3. Keep lines under 250 to maintain readability for AI-assisted tooling.

---

## 5. Integration with Our Rules & Stack

• [Tech Stack](../project-info/tech-stack.md) & [Tech Stack Rules](./tech-stack-rules.md)  
  – Follow recommended patterns for React + Vite, Tailwind, Zustand, Supabase, and FastAPI.  
• [UI Rules](./ui-rules.md)  
  – Ensure a desktop-first approach, with clear structure and accessible components from Shadcn (Radix).  
• [Theme Rules](./theme-rules.md)  
  – Maintain a minimalist design with consistent color usage and spacing guidelines.

---

## 6. Modular & Layered Approach

1. **Frontend**:  
   • Separate concerns by using hooks for business logic (Zustand store & queries), and components for presentation.  
   • Keep pages (or routes) minimal—delegate complex logic to specialized hooks/services.

2. **Backend** (FastAPI):  
   • Group endpoints by domain (e.g., auth, tickets, AI).  
   • Keep service logic in dedicated "services/" modules.  
   • Use "models/" or "schemas/" for Pydantic models, ensuring input/output types are explicit.

3. **Shared Logic**:  
   • Place cross-cutting utilities (date/time formatting, constants, shared types) in "shared/" to promote reuse and reduce duplication.

---

## 7. Final Notes & Maintenance

• Regularly revisit this structure and refactor as the application grows.  
• Each new feature or module should follow the same naming, layering, and file size guidelines.  
• Perform code reviews to maintain consistency, ensuring that doc comments, file structure, and readability remain top notch.

---

By adhering to these codebase best practices, our AI-powered AutoCRM will remain easy to navigate, maintain, and extend. It ensures clarity for both human contributors and AI-based tools, fostering an environment where new features—whether from the domain of generative AI, Realtime systems, or standard business logic—can be integrated swiftly and confidently. 