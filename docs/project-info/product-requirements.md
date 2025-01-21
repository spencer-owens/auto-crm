# Product Requirements

## Project Overview

AutoCRM is an AI-powered support platform inspired by Zendesk, designed to streamline customer interactions and automate routine tasks. It leverages Supabase for authentication, data storage, and real-time updates to offer a scalable, secure solution.

## Core Workflows

1. Users sign up or log in through Supabase Auth.  
2. Customers create tickets, attach files, and track resolutions.  
3. Agents view assigned tickets and collaborate via internal notes.  
4. Admins configure teams, manage users, and analyze performance.  
5. Real-time notifications alert stakeholders of ticket updates.  
6. The knowledge base and chatbot answers common queries.  
7. Feedback and ratings measure effectiveness after resolutions.

## Technical Foundation

### 1. Data Models

• Users:  
  - Fields: id, email, hashed_password (or Auth-managed), full_name, role, timestamps.  
  - Relationships: one-to-many with Tickets; role determines access (customer, agent, admin).

• Tickets:  
  - Fields: id, customer_id, subject, description, status, priority, timestamps.  
  - Relationships: many tickets can reference one customer; optionally assigned_to an agent.

• Ticket Messages:  
  - Fields: id, ticket_id, sender_id, message_body, is_internal, created_at.  
  - Relationships: many messages can belong to one ticket, sent by either customers or agents.

• Teams:  
  - Fields: id, team_name, created_at, updated_at.  
  - Relationships: one-to-many with Users (agents).

• Additional Metadata/Resources:  
  - Tag associations (ticket_tags), custom fields, file attachments, each referencing tickets or messages via IDs.  
  - Stored in separate tables to maintain flexible, modular data structures.

### 2. API Endpoints

• Users  
  - GET /api/users (Admin only)  
  - POST /api/users (Admin only)  
  - GET /api/users/:id (Admin or the user themselves)  
  - PATCH /api/users/:id (Admin only)

• Tickets  
  - GET /api/tickets (Agents/Admin see all; Customers see own)  
  - POST /api/tickets (Any logged-in user)  
  - GET /api/tickets/:id (Owner or assigned agent/admin)  
  - PATCH /api/tickets/:id (Assigned agent or Admin)  
  - DELETE /api/tickets/:id (Admin only)

• Ticket Messages  
  - GET /api/ticket-messages/:ticketId  
    - Returns messages (including internals if agent/admin).  
  - POST /api/ticket-messages/:ticketId  
    - Creates new messages; "is_internal" restricted to agent/admin.

• Teams  
  - GET /api/teams (Admin only)  
  - POST /api/teams (Admin only)  
  - PATCH /api/teams/:id (Admin only)  
  - DELETE /api/teams/:id (Admin only)

• Metadata & Attachments  
  - POST /api/ticket-tags (Agent/Admin)  
  - DELETE /api/ticket-tags/:ticketId/:tagName (Agent/Admin with access)  
  - POST /api/attachments (Ticket owner or assigned agent/admin)  
  - GET /api/attachments/:id (Requires ticket access)

• Knowledge Base (Optional)  
  - GET /api/knowledge-base (Public or minimal auth)  
  - GET /api/knowledge-base/:slug (Public)

### 3. Components to Be Used

• LandingPage (Public)  
• KnowledgeBase (Public)  
• CustomerDashboard (Lists tickets; create new)  
• AgentDashboard (Assigned tickets; real-time updates)  
• AdminPanel (Manage teams, users, analytics, SLA/settings)  
• TicketDetailPage (Conversation, updates, attachments)  
• TeamManagementPage (Add/remove agents, rename teams)  
• SettingsPage (System-wide config, custom fields)  
• AuthComponents (Login, SignUp, ForgotPassword)  
• ErrorBoundary or NotFoundPage (Fallback UI)  
• LiveChatWidget or ChatbotUI (Optional real-time/AI support)

These foundational elements ensure a secure, maintainable, and scalable environment for user authentication, data management, and ticket collaboration. 