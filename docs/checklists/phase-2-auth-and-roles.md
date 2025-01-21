# Phase 2: User Authentication & Role Management

Implement user registration, login, and role distinctions (customers, agents, admins) following Supabase Auth and your backend logic.

1. [ ] FRONTEND: Create a Signup page with form fields for email/password/full name.  
2. [ ] FRONTEND: Integrate Supabase Auth in a custom hook (e.g., useAuthStore) for registration and login.  
3. [ ] FRONTEND: Build a Login page that validates inputs and logs the user in via Supabase.  
4. [ ] FRONTEND: Add role-based UI logic (e.g., hide admin links unless user.role === "admin").  
5. [ ] BACKEND: Configure Supabase row-level security (RLS) for user data, ensuring customers can only see their own records.  
6. [ ] BACKEND: Extend main.py or a dedicated auth.py with endpoints to fetch or update user profiles, including roles.  
7. [ ] BACKEND: Validate token or JWT in protected routes (tickets, admin pages) to enforce role checks.  

References:  
• @data-model.md (user model)  
• @core-functionality.md (user signup, role separation)  
• @important-considerations.md (Supabase Auth, row-level security)  
• @product-requirements.md (login, authentication flows)  
• @tech-stack-rules.md (Supabase Auth best practices)
