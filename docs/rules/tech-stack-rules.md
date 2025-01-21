# Tech Stack Rules

This document lays out best practices, common pitfalls, and conventions for each technology in our chosen stack.

---

## 1. React + Vite

### Best Practices
• Keep the code modular by splitting large components into smaller, reusable ones.  
• Use function components with hooks for more concise, declarative code.  
• Leverage Vite's fast dev-server and HMR (Hot Module Replacement) to streamline development.  
• Configure environment variables properly (e.g., using .env files) for build-time vs. runtime differences.

### Limitations & Common Pitfalls
• Avoid mixing create-react-app assumptions with Vite configurations (e.g., different environment variable prefixes).  
• With large-scale apps, watch for potential memory usage spikes when bundling. Regularly analyze bundle sizes and optimize.  
• SSR (Server Side Rendering) configuration isn't as built-in as Next.js, so if SSR is needed, consider additional plugins or frameworks.

---

## 2. Tailwind CSS & Shadcn (Radix UI)

### Best Practices
• Adopt a mobile-first approach using Tailwind's responsive utilities (e.g., sm:, md:, lg:).  
• Deploy global styles (like typography, reset) in a single CSS or in the globals file, minimizing redundancy.  
• Use consistent naming conventions for custom utility classes or extracted components.  
• Leverage Shadcn UI components for accessibility and consistent, reusable patterns.

### Limitations & Common Pitfalls
• Overuse of utility classes can become cumbersome if not properly organized—consider grouping or extracting frequently used class sets.  
• Avoid deep overrides of Shadcn or Radix UI styles that cause complex specificity. Keep styles consistent and minimal.  
• Ensure important Radix UI props (e.g., accessibility attributes) remain intact; customization that strips ARIA labels can affect accessibility.

---

## 3. Zustand

### Best Practices
• Keep global state minimal; use local state whenever possible. Zustand should only track data genuinely needed across multiple components.  
• Structure stores in modules to avoid a bloated central store. For example, "useAuthStore" vs "useTicketStore."  
• Use Immer (optionally) or produce patterns if you prefer immutable updates, though Zustand can handle direct assignments.

### Limitations & Common Pitfalls
• Overly large or complicated stores can make debugging harder. Keep data flows straightforward, or consider multiple smaller stores.  
• Avoid unnecessary re-renders by making selective subscriptions to slices of the store rather than the entire state.  
• Make sure the store shape remains stable over time to avoid unexpected behaviors or stale data in components.

---

## 4. Supabase Auth

### Best Practices
• Rely on Supabase's built-in row-level security (RLS) policies for server-side data protection, not just client checks.  
• Use the JWT tokens or session-based approach from Supabase for secure, role-based access.  
• Map user roles (e.g., customer, agent, admin) carefully and maintain them consistently across the application.

### Limitations & Common Pitfalls
• Relying solely on client checks can expose vulnerabilities; always validate on the server side.  
• If the user's token expires, ensure your application handles re-authentication gracefully to avoid confusing error states.  
• Rate-limit or throttle requests during auth-sensitive actions like password resets to prevent brute-force attacks.

---

## 5. Database & Realtime (Supabase Postgres)

### Best Practices
• Define clear table naming conventions (snake_case). Keep indexes on frequently queried fields (e.g., created_at, status).  
• Use database migrations to track schema changes over time—avoid ad-hoc modifications.  
• Implement Realtime with caution: subscribe sparingly to events you actually need to avoid flooding websockets.

### Limitations & Common Pitfalls
• Over-subscribing to channels or large tables can lead to heavy bandwidth usage and performance bottlenecks.  
• Large data operations or repeated queries without proper indexing can degrade performance quickly.  
• Ensure consistent primary key usage (UUID vs. incremental IDs) and maintain data integrity constraints (foreign keys).

---

## 6. File Storage (Supabase Storage)

### Best Practices
• Restrict buckets and object access with secure policies that verify user roles and ticket ownership.  
• Store metadata (like file size or type) in your database for quick lookups and usage validation.  
• Organize files in logical directories, e.g., "tickets/{ticket_id}/attachments/{attachment_id}" for better clarity.

### Limitations & Common Pitfalls
• Storing large or very frequent files can lead to high costs — monitor usage and consider caching strategies.  
• Publicly accessible files can leak sensitive data if not managed carefully.  
• Handling file versioning or frequent updates requires additional logic (e.g., versioned file naming).

---

## 7. AI Endpoint & Embeddings (FastAPI + LangChain)

### Best Practices
• Use FastAPI for clear, well-defined microservice endpoints that separate AI logic from the main application.  
• Make sure vector data stored in Supabase pgvector is properly indexed for efficient searching.  
• Validate and sanitize input to AI endpoints to protect from injection or malicious content.

### Limitations & Common Pitfalls
• Large language model responses can be expensive (time and cost) if used excessively — implement usage limits or caching.  
• Vector search can be resource-intensive if the dataset is large, requiring indexing, partitioning, or approximate nearest neighbor configurations.  
• Maintaining multiple model versions or updating embeddings might necessitate retraining indexes or re-uploading vector data.

--- 