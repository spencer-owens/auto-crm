# Phase 4: Real-Time Messaging & Internal Notes

Implement real-time ticket message threads and the ability for agents to leave internal notes.

1. [ ] BACKEND: Build ticket_messages.py or expand existing tickets.py with messaging endpoints (create, read).  
2. [ ] BACKEND: Extend schemas.py with TicketMessage models (message_body, is_internal, sender_id).  
3. [ ] BACKEND: Set up Supabase Realtime subscription logic for the ticket_messages table.  
4. [ ] FRONTEND: Use a custom hook (e.g., useTicketMessages) to subscribe to new message events on a given ticket.  
5. [ ] FRONTEND: Display full conversation history (including who sent each message).  
6. [ ] FRONTEND: Provide a text input to submit new messages. If is_internal is selected (agent/admin only), mark the message as internal.  
7. [ ] FRONTEND: Update the UI in real time when new messages arrive.  

References:  
• @core-functionality.md (messages & collaboration)  
• @important-considerations.md (realtime with Supabase)  
• @ui-rules.md (desktop-first approach for conversation layout)  
• @tech-stack-rules.md (Zustand or direct subscription usage)  
• @theme-rules.md (minimalist, focus on conversation area)
