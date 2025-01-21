# Phase 5: Admin Features & Analytics

Implement administrative controls (team management, user management) and basic reporting dashboards.

1. [ ] BACKEND: Create admin endpoints in admin.py or expand as needed for:  
    - CRUD operations on users (add, remove, update roles).  
    - Managing teams (create, rename, delete, view).  
2. [ ] BACKEND: Implement basic analytics queries (e.g., total tickets, open vs. closed, average resolution time).  
3. [ ] BACKEND: Possibly add a separate table or a scheduled job to store daily aggregates for performance metrics.  
4. [ ] FRONTEND: Add an AdminPanel.jsx/tsx for user management (list users, edit roles).  
5. [ ] FRONTEND: Build a TeamManagementPage to create/delete teams, assign agents.  
6. [ ] FRONTEND: Create an AnalyticsPage that visualizes ticket metrics (charts or tables, depending on scope).  
7. [ ] FRONTEND: Restrict access to admin pages/elements if user.role !== "admin."  

References:  
• @data-model.md (teams)  
• @core-functionality.md (team management, analytics)  
• @product-requirements.md (admin panel, performance reporting)  
• @tech-stack-rules.md (SQL queries in Supabase, potential multi-table joins)  
• @ui-rules.md (multi-column layout for admin controls on desktop)
