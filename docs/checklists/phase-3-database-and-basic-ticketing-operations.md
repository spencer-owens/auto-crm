# Phase 3: Database & Basic Ticket Operations

Focus on creating tickets, updating them, and retrieving them. Ensure the data models align with your final database schema.

1. [ ] BACKEND: Create tickets.py endpoint with basic CRUD operations (create, read, update, delete) referencing the tickets table.  
2. [ ] BACKEND: Implement models/schemas.py for Ticket, referencing data-model.md.  
3. [ ] BACKEND: Secure these endpoints so only the ticket owner or an agent/admin can view/update them.  
4. [ ] BACKEND: Add indexing or constraints in database.py aligned with the data model (e.g., indexes on status).  
5. [ ] FRONTEND: Build a TicketList page (Dashboard) showing the user’s tickets if role=customer or team’s tickets if role=agent.  
6. [ ] FRONTEND: Add a “Create Ticket” form. On submit, call backend to generate new ticket and store it in Supabase.  
7. [ ] FRONTEND: Allow ticket updates (e.g., editing ticket status or priority) for agents/admin.  

References:  
• @data-model.md (tickets)  
• @core-functionality.md (ticket creation, updates)  
• @product-requirements.md (ticket endpoints, assigned agents)  
• @tech-stack-rules.md (Supabase, React/Vite patterns)  
• @codebase-best-practices.md (max 250 lines, modular approach)
