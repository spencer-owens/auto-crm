# UI Rules

This document provides guidelines and best practices for building a desktop-first, responsive, and accessible user interface in AutoCRM. It integrates insights from the User Flow, Product Requirements, and Tech Stack Rules to ensure a cohesive design aligned with our chosen technologies.

---

## 1. Desktop-First & Responsiveness

• Prioritize layouts and features for desktop screens, ensuring clear information hierarchy on larger displays.  
• Use responsive breakpoints (e.g., md:, lg:, xl:) from Tailwind to adapt the UI for tablets and mobiles.  
• Keep key functionality (like ticket creation, dashboards, admin panels) neatly arranged in multi-column structures on desktop.  
• On smaller screens, collapse complex layouts, use collapsible sidebars/menus, or switch to single-column views.

---

## 2. Accessibility Principles

• Maintain consistent heading levels and semantic HTML tags (e.g., <header>, <nav>, <main>, <section>), following WCAG guidelines.  
• Respect Radix UI's built-in ARIA attributes; avoid overriding them in a way that compromises screen reader compatibility.  
• Ensure interactive elements (buttons, links, toggles) have visible focus states and sufficient color contrast.  
• Provide descriptive alt text for images and label icons or controls for assistive technologies.

---

## 3. Navigation & Layout

• Outline clear navigation paths for each user type (unauthenticated, customers, agents, admins) based on [User Flow](../project-info/user-flow.md).  
• Keep essential navigation elements (sidebars, top nav) consistently accessible on desktop.  
• Minimize clutter: emphasize the most frequently accessed actions (e.g., "Create Ticket," "View Tickets," "Admin Panel") with clear CTA buttons or icons.  
• Consider pinned headers or sidebars for quick context and easy navigation, especially on large screens.

---

## 4. Consistency & Reusability

• Leverage reusable Shadcn (Radix UI) components for dialogues, dropdowns, modals, and toasts, ensuring consistent styles and behavior.  
• Define utility classes or small shared components in Tailwind for commonly repeated UI elements (e.g., button variants, card containers).  
• Align with [Tech Stack Rules](../tech-stack-rules.md) to keep code structured: separate data fetching (Supabase queries) from UI logic, use Zustand for global state only when essential.

---

## 5. Performance & Feedback

• Load heavier resources (like admin analytics or large knowledge base components) conditionally or lazily, optimizing initial load.  
• Implement quick visual feedback (e.g., skeleton loaders or spinners) during data fetches.  
• Use real-time updates from Supabase Realtime for tickets, ensuring new or updated data is immediately visible without crowding the interface.  
• Validate user inputs (e.g., forms for ticket creation) on both client and server to maintain a smooth experience and secure data handling.

---

## 6. Integration with Product Requirements

• Reflect [Product Requirements](../project-info/product-requirements.md):  
  – Provide accessible pages for ticket creation, management, and feedback collection.  
  – Surface real-time notifications or counters on the main dashboard (e.g., new ticket count for agents, system alerts for admins).  
• Support quick AI-based suggestions or chat interfaces by integrating the AI endpoint, ensuring it fits seamlessly into the UI (chat widget or dedicated panel).

---

## References

• [User Flow](../project-info/user-flow.md): Guides how different roles (customers, agents, admins) interact with the app.  
• [Product Requirements](../project-info/product-requirements.md): Details the must-have features and workflows.  
• [Tech Stack](../project-info/tech-stack.md) & [Tech Stack Rules](../tech-stack-rules.md): Explains the chosen technologies and best practices for them.

By applying these UI Rules, AutoCRM ensures a clean, desktop-focused layout that gracefully degrades to smaller screens, prioritizing discoverability, performance, and accessibility across all user segments. 