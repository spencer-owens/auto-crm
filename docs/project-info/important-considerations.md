# Important Technical Considerations

This document outlines critical technical considerations for implementing AutoCRM, including authorization, realtime updates, storage, and state management.

## 1. Authorization (Supabase Built-in Auth)

• Single, top-layer Auth provider via Supabase:  
  - All user records are managed in Supabase Auth.  
  - Role-based logic enforced in application code or through row-level security (RLS) policies.
• Agents and Admins access specialized dashboards or APIs only if their role matches.  
• Potential for row-level security to ensure customers only see tickets tied to their own user id or organization/team.

## 2. Realtime Requirements with Supabase

• Use Supabase's Realtime features to update ticket queues, message threads, and analytics dashboards without manual refresh.  
• Subscribe to:  
  - Ticket changes (e.g., status updates) for agents or admins.  
  - New messages on a ticket so customers or agents see conversation updates in real-time.  
• Consider partial updates where only changed fields are refreshed, reducing bandwidth usage.

## 3. Storage Requirements

• File attachments stored in Supabase Storage.  
  - Tied to ticket records or message records.  
  - Ensure secure read access for authorized users only (e.g., customers can see their own attachments, but not others').  
• Potential separation of public vs. private assets (public knowledge base images might be stored differently than private ticket attachments).

## 4. State Management Requirements

• Frontend state may use React Context, Zustand, or Redux for tracking user sessions, ticket data, and real-time updates.  
• Keep global state minimal; query data on-demand with caching (e.g., React Query) to avoid stale data.  
• Provide local caches for offline-friendly or quick interactions, especially for ticket lists or knowledge base content.

## 5. Code Modularity & Reusability

• Separate concerns:
  - Data access (Supabase queries) in one layer.  
  - Service/use-case logic in another layer (e.g., ticket creation, assignment rules).  
  - UI components in a structured, reusable manner.  
• Keep components pure and functional.  
• Provide well-defined hooks or services for real-time subscriptions to keep UI modules decoupled from direct database interaction.  
• Use utility functions for repeated logic like formatting dates, generating priority labels, or filtering tickets. 