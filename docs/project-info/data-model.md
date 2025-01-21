# Data Models

This document outlines the primary data models required for AutoCRM. Each model includes the fields needed to support the user stories and flow of the system, as well as the relationships between models.

## 1. Users

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

## 2. Tickets

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

## 3. Ticket Messages

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

## 4. Teams

• Description: Groups agents according to business logic (e.g., support, sales).  
• Fields:  
  - id (UUID)  
  - team_name (string)  
  - created_at (timestamp)  
  - updated_at (timestamp)  

• Relationships:  
  - One-to-many relationship with users (agents).  
  - Used by admin roles for skill-based routing.

## 5. Additional Metadata / Resources

• Description: Captures extra information like tags, custom fields, or file attachments.  
• Implementation:  
  - Separate tables store flexible key-value or category associations.  
    - Example: ticket_tags (ticket_id, tag_name).  
    - Example: attachments (id, ticket_id, file_path, created_at).  
  - Custom fields can be stored in a JSON column or in a dedicated table ("ticket_custom_fields") with a name/value pairing.  

## Database Naming Conventions & Relations

• Tables named in lowercase snake_case, e.g., "users," "tickets," "ticket_messages," "teams."  
• Foreign keys referencing "id" across tables.  
• Remain flexible for additional relationships (e.g., "ticket_tags").  
• Index frequently queried fields, e.g., "status," "assignee," "created_at." 