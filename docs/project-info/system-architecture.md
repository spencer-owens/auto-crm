# System Architecture

This document integrates and expands on the data models, core functionality, and important considerations to provide a comprehensive architecture for our Zendesk clone application. Below are three primary sections covering API routes, the overall page structure, and essential middleware functions.

---

## 1. API Routes with HTTP Methods & Auth Requirements

1. Users Endpoints  
   - GET /api/users  
     - Auth: Admin only.  
     - Returns a list of all users. May include filtering by role.  
   - POST /api/users  
     - Auth: Admin only.  
     - Creates a new user (e.g., agent or admin). Customer sign-up typically goes through Supabase Auth.  
   - GET /api/users/:id  
     - Auth: Admin or the user themselves.  
     - Fetches a single user record, including role and metadata.  
   - PATCH /api/users/:id  
     - Auth: Admin only.  
     - Updates selected fields like role or user profile info.  

2. Tickets Endpoints  
   - GET /api/tickets  
     - Auth: Agent or Admin to view all tickets, Customer to view only their tickets (enforced by RLS or code-level checks).  
     - Supports query params for filtering by status, priority, assignee, etc.  
   - POST /api/tickets  
     - Auth: Any logged-in user (customer, agent, or admin).  
     - Creates a new ticket with required fields (subject, description).  
   - GET /api/tickets/:id  
     - Auth: Ticket owner (customer) or assigned agent/admin.  
     - Returns ticket details, including messages, status, priority, etc.  
   - PATCH /api/tickets/:id  
     - Auth: Agent (assigned) or Admin.  
     - Updates the status, priority, or assigned agent.  
   - DELETE /api/tickets/:id  
     - Auth: Admin only.  
     - Removes a ticket from the system, potentially triggers archival logic.  

3. Ticket Messages Endpoints  
   - GET /api/ticket-messages/:ticketId  
     - Auth: Customer who owns the ticket, or assigned agent/admin.  
     - Returns a list of messages (including internal notes if user is agent/admin).  
   - POST /api/ticket-messages/:ticketId  
     - Auth: Customer, agent, or admin with access to the ticket.  
     - Creates a new message. If "is_internal" is true, restricted to agents/admins only.  

4. Teams Endpoints  
   - GET /api/teams  
     - Auth: Admin only.  
     - Retrieves a list of all teams and their members.  
   - POST /api/teams  
     - Auth: Admin only.  
     - Creates a new team with a given name.  
   - PATCH /api/teams/:id  
     - Auth: Admin only.  
     - Updates team information, including adding/removing agents.  
   - DELETE /api/teams/:id  
     - Auth: Admin only.  
     - Removes a team, optionally reassigns or unassigns its agents.  

5. Additional Metadata & Attachments  
   - POST /api/ticket-tags  
     - Auth: Agent or Admin.  
     - Attaches a tag (e.g., "urgent," "billing") to a ticket.  
   - DELETE /api/ticket-tags/:ticketId/:tagName  
     - Auth: Agent or Admin who has access to that ticket.  
     - Removes a specific tag from a ticket.  
   - POST /api/attachments  
     - Auth: Ticket owner or assigned agent/admin.  
     - Uploads a file to Supabase Storage and associates it with a ticket or a ticket message.  
   - GET /api/attachments/:id  
     - Auth: Must have ticket access.  
     - Returns a secure URL or direct file data, depending on the logic implemented.  

6. Self-Service Tools & Knowledge Base (Optional Additional Routes)  
   - GET /api/knowledge-base  
     - Public or minimal auth.  
     - Returns articles or help topics for self-service.  
   - GET /api/knowledge-base/:slug  
     - Public.  
     - Retrieves a single article by its slug or ID.

7. Auth Requirements & Notes  
   - All routes use Supabase Auth to validate roles and ownership.  
   - Row-Level Security (RLS) may be enabled for further protection (e.g., customers can only query their own tickets).  
   - Admin roles have full read/write privileges on all endpoints.

---

## 2. Page Structure & Components Needed

1. LandingPage (Public)  
   - Displays marketing content, sign-up, login buttons, and links to self-service tools (like the knowledge base).

2. KnowledgeBase (Public)  
   - Shows searchable FAQs and articles.  
   - Includes category filters and a single-article view.

3. CustomerDashboard (Customer)  
   - Lists customer's open and closed tickets.  
   - Includes a CreateTicketModal for new tickets.  
   - Provides quick status filters and clickable links to TicketDetailPage.

4. AgentDashboard (Agent)  
   - Displays assigned or unassigned tickets filtered by team, priority, status, etc.  
   - Offers "bulk update" or "bulk reassign" options.  
   - Integrates real-time notifications for new ticket messages or reassignments.

5. AdminPanel (Admin)  
   - Central hub for managing teams, user roles, advanced settings, and analytics.  
   - Organizes administrative actions (e.g., "Manage Teams," "View Reports," "Configure SLAs") via tabbed interface or sub-pages.

6. TicketDetailPage (Customer/Agent/Admin)  
   - Shows ticket status, assigned agent, conversation history, attachments, and rating or feedback if closed.  
   - Agents/Admins can leave internal notes hidden from the customer view.  
   - Supports changing ticket status, adding watchers, or modifying the assigned agent.

7. TeamManagementPage (Admin)  
   - Lists teams and their associated agents.  
   - Allows admin to create, rename, or delete teams.  
   - Add or remove agents from specific teams.

8. SettingsPage (Admin)  
   - Admin sets system-wide rules (SLA times, routing logic), email templates, and other configuration.  
   - Possibly includes custom field definitions or advanced ticket workflows.

9. AuthComponents (Shared)  
   - LoginForm, SignUpForm, ForgotPasswordForm, integrated with Supabase Auth.  
   - Commonly used for gating access to protected pages.

10. ErrorBoundary or NotFoundPage (Shared)  
   - Displays user-friendly error messages or a 404 if the route doesn't exist.  
   - Could also show fallback UI for unhandled exceptions.

11. LiveChatWidget or ChatbotUI (Optional)  
   - Embeddable chat interface for real-time or AI-driven support.  
   - Allows visitors to interact without leaving the current page.

---

## 3. Key Middleware Functions

1. AuthCheckMiddleware  
   - Validates Supabase session data on incoming server-side requests or API calls.  
   - Determines if user role (customer, agent, admin) matches route permission.

2. TicketOwnershipMiddleware  
   - Ensures that if a customer is accessing or modifying a ticket, they own it.  
   - Checks agent or admin roles for broader ticket access.

3. InternalNoteProtectionMiddleware  
   - Bars customers from creating or viewing 'internal' messages.  
   - Allows messages with the "is_internal" flag only if the role is agent or admin.

4. RealtimeSubscriptionSetup  
   - Subscribes client dashboards (customer or agent) to changes in tickets or ticket messages.  
   - Automatically updates UI for new messages, status changes, or file attachments.

5. FileUploadHandler  
   - Validates file size and type.  
   - Uploads attachments to Supabase Storage.  
   - Stores reference in "attachments" table, ensuring Supabase security policies restrict access to ticket owners or agents.

6. LoggingMiddleware  
   - Records request metadata (user ID, timestamps, route) for auditing, analytics, or debugging.  
   - Potentially logs slow queries or frequent error patterns.

7. RoutingRuleMiddleware (Admin Configuration)  
   - Optionally uses defined routing rules (skill-based or round-robin) to auto-assign new tickets.  
   - Invoked after a ticket creation or status change event.

8. RateLimitingMiddleware (Optional)  
   - Limits the number of requests or new tickets from a single user in a time window, preventing spam or abuse.

---

By pairing these expanded routes, pages, and middleware functions with Supabase Auth, Realtime, and Storage, our Zendesk clone covers the core requirements from user authentication to ticket management, collaboration, knowledge base, and administrative controls. This architecture is designed for scalability, maintainability, and a robust user experience. 