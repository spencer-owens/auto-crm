# Tech Stack Options

Below is a breakdown of each anticipated part of our stack, focusing only on the selected approach. We are prioritizing Supabase services (Auth, Realtime, Storage, pgvector) alongside a FastAPI + Langchain AI endpoint. The frontend will use TypeScript, Vite/React, Tailwind, Shadcn, and Zustand.

---

## 1. Frontend Framework & Build Tool

We're proceeding with React + Vite for the frontend, providing fast iterative builds, an excellent developer experience, and a robust ecosystem.

---

## 2. Styling & Component Library

We will use Tailwind CSS for utility-first styling, with Shadcn/UI on top of Radix UI primitives for a structured, composable design system.

---

## 3. State Management

Zustand offers a lightweight, minimal-boilerplate solution with an intuitive API, making it easy to manage local or global state.

---

## 4. Authentication & Backend Services

Supabase Auth (backed by Postgres) handles user accounts, roles, and RLS policies for secure access control.

---

## 5. Database & Realtime

Supabase (Postgres) provides our primary data storage and Realtime functionality, ensuring tight integration with the rest of the Supabase ecosystem.

---

## 6. File Storage

Supabase Storage is used for file attachments, enforcing secure read/write policies for authorized users.

---

## 7. AI Endpoint & Embeddings

We will integrate a FastAPI microservice with LangChain for advanced language model workflows, storing vector embeddings in Supabase pgvector for semantic search.

---
