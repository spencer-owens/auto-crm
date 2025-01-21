# Technical Requirements

This document consolidates information from the Project Overview, User Stories, Project Map, and User Flow to define the essential technical requirements for AutoCRM. It covers data models, core functionalities, and additional considerations for authorization, realtime updates, storage, state management, and code organization.

---

## 1. Data Models

Below are the primary data models required for the CRM. Each model includes the fields needed to support the user stories and flow of the system, as well as the relationships between models.

### 1.1 Users

• Description: A generic user record that serves as the basis for different user roles (customer, agent, admin).  
• Fields:  
  - id (UUID)  
  - email (string)  
  - hashed_password (string) — or managed by Supabase Auth for security  
  - full_name (string)  
  - role (string) — e.g., "customer," "agent," "admin"; stored as text to avoid enums  
  - created_at (timestamp)  
  - updated_at (timestamp)  

• Relationships:  
  - One-to-many relationship to tickets (e.g., a user can create multiple tickets).  
  - Agents and admins are specialized "roles" of the same user model (e.g., user.role = "agent" or "admin").  

### 1.2 Tickets

• Description: Central to the application, representing each support or sales issue.  
• Fields:  
  - id (UUID)  
  - customer_id (UUID) — references users.id (role: "customer")  
  - subject (string)  
  - description (text)  
  - status (string) — e.g., "open," "pending," "closed"  
  - priority (string) — e.g., "low," "medium," "high," or custom  
  - created_at (timestamp)  
  - updated_at (timestamp)  

• Relationships:  
  - Many tickets can be linked to a single user (customer).  
  - Potentially a "assigned_to" field (agent_id) referencing users.id (role: "agent").  
  - Tickets can have many "Ticket Messages" records (for conversation threads, notes, or updates).

### 1.3 Ticket Messages

• Description: Stores the conversation history and internal notes attached to a ticket.  
• Fields:  
  - id (UUID)  
  - ticket_id (UUID) — references tickets.id  
  - sender_id (UUID) — references users.id  
  - message_body (text) — can be plain text or rich text  
  - is_internal (boolean) — indicates if the note is private/internal  
  - created_at (timestamp)  

• Relationships:  
  - Many messages belong to one ticket.  
  - Many messages can be from different users (customers, agents).  

### 1.4 Teams

• Description: Groups agents according to business logic (e.g., support, sales).  
• Fields:  
  - id (UUID)  
  - team_name (string)  
  - created_at (timestamp)  
  - updated_at (timestamp)  

• Relationships:  
  - One-to-many relationship with users (agents).  
  - Used by admin roles for skill-based routing.

### 1.5 Additional Metadata / Resources

• Description: Captures extra information like tags, custom fields, or file attachments.  
• Implementation:  
  - Separate tables store flexible key-value or category associations.  
    - Example: ticket_tags (ticket_id, tag_name).  
    - Example: attachments (id, ticket_id, file_path, created_at).  
  - Custom fields can be stored in a JSON column or in a dedicated table ("ticket_custom_fields") with a name/value pairing.  

---

## 2. Core Functionality Requirements

1. **User Authentication & Role Management**  
   - Allow users to sign up or log in via Supabase Auth.  
   - Distinguish between "customer," "agent," and "admin" roles in the user record or a separate role-mapping structure.  
   - Provide secure, role-based access to resources (e.g., only admins can view analytics, only agents can view the agent dashboard).

2. **Ticket Creation & Updating**  
   - Customers can create new tickets with a subject, description, and optional file attachments.  
   - Agents can update statuses, add internal notes, or reply to the customer.  
   - Admins can override ticket assignments or escalate tickets when necessary.

3. **Ticket Queue & Filtering**  
   - Agents see a list of tickets assigned to them or their team.  
   - Provide filters by status, priority, date ranges, tags, etc.  
   - Support bulk operations (e.g., update multiple tickets to "pending" at once).

4. **Messages & Collaboration**  
   - Each ticket has a log of messages showing the conversation between customer and agent.  
   - Agents can leave internal notes not visible to the customer.  
   - Provide macros or templates for quick responses.

5. **Analytics & Reporting**  
   - Admins can view metrics like ticket volume, agent performance/ratings, response times, and resolution rate.  
   - Possibly store or compute daily/weekly aggregates for quicker reporting.

6. **Self-Service Tools**  
   - Public knowledge base accessible without login.  
   - AI chatbots integrated via a separate or embedded UI.  
   - Prompt user to search articles before creating a ticket.

7. **Feedback & Rating System**  
   - Once a ticket is resolved, the customer can rate the help received.  
   - Agents and admins can view/report on these ratings.

8. **Administration & Configuration**  
   - Admin panel for adjusting system-wide settings like routing rules, SLAs, and email templates.  
   - Manage teams, user permissions, coverage schedules, and skill sets.

---

## 3. Other Considerations

### 3.1 Authorization Requirements (Supabase Built-in Auth)

• Single, top-layer Auth provider via Supabase:  
  - All user records are managed in Supabase Auth.  
  - Role-based logic enforced in application code or through row-level security (RLS) policies.
• Agents and Admins access specialized dashboards or APIs only if their role matches.  
• Potential for row-level security to ensure customers only see tickets tied to their own user id or organization/team.

### 3.2 Realtime Requirements with Supabase

• Use Supabase's Realtime features to update ticket queues, message threads, and analytics dashboards without manual refresh.  
• Subscribe to:  
  - Ticket changes (e.g., status updates) for agents or admins.  
  - New messages on a ticket so customers or agents see conversation updates in real-time.  
• Consider partial updates where only changed fields are refreshed, reducing bandwidth usage.

### 3.3 Storage Requirements

• File attachments stored in Supabase Storage.  
  - Tied to ticket records or message records.  
  - Ensure secure read access for authorized users only (e.g., customers can see their own attachments, but not others').  
• Potential separation of public vs. private assets (public knowledge base images might be stored differently than private ticket attachments).

### 3.4 State Management Requirements

• Frontend state may use React Context, Zustand, or Redux for tracking user sessions, ticket data, and real-time updates.  
• Keep global state minimal; query data on-demand with caching (e.g., React Query) to avoid stale data.  
• Provide local caches for offline-friendly or quick interactions, especially for ticket lists or knowledge base content.

### 3.5 Database Naming Conventions & Relations

• Tables named in lowercase snake_case, e.g., "users," "tickets," "ticket_messages," "teams."  
• Foreign keys referencing "id" across tables.  
• Remain flexible for additional relationships (e.g., "ticket_tags").  
• Index frequently queried fields, e.g., "status," "assignee," "created_at."  

### 3.6 Code Modularity & Reusability

• Separate concerns:
  - Data access (Supabase queries) in one layer.  
  - Service/use-case logic in another layer (e.g., ticket creation, assignment rules).  
  - UI components in a structured, reusable manner.  
• Keep components pure and functional.  
• Provide well-defined hooks or services for real-time subscriptions to keep UI modules decoupled from direct database interaction.  
• Use utility functions for repeated logic like formatting dates, generating priority labels, or filtering tickets.

---

## Summary

Implementing these technical requirements will ensure the AutoCRM application meets the diverse needs of unauthenticated visitors, customers, agents, and admins. The data models specified here capture essential information for tickets, users, teams, and meta-information like messages or attachments. Core functionalities like ticket queues, collaboration, analytics, and self-service tools address the core features outlined in the user stories and project overview. By leveraging Supabase's built-in Auth, Storage, and Realtime features — and coupling them with careful data modeling and robust state management — the system will be performant, secure, and scalable. 