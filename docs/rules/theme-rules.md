# Theme Rules (Minimalist)

This document defines the visual style for AutoCRM's user interface, emphasizing a minimalist approach that aligns with our desktop-first philosophy and overall product requirements.

---

## 1. Core Principles

• Simplicity First: Use clean layouts, minimal color accents, and whitespace to direct attention toward critical content and actions.  
• Clear Hierarchy: Emphasize headings, important data points, and primary CTAs (e.g., "Create Ticket") with subtle but noticeable style contrasts.  
• Unified Look & Feel: Keep consistent styling across all pages, reinforcing brand identity and trust.

---

## 2. Color Palette

• Primary Background: Light gray or near-white (e.g., #F9FAFB).  
• Surface Elements: White (#FFFFFF) for components like cards, modals, or key panels, ensuring a bright and fresh appearance.  
• Text: Use dark gray (#111827 or #2D2D2D) for headlines, slightly lighter gray (#3D3D3D) for body text. Maintain at least 4.5:1 contrast ratio.  
• Accents: A single muted color (e.g., a soft blue #3B82F6) for buttons, links, and highlights. Use it sparingly to retain minimalism.

### Best Practices

• Stick to 2–3 core colors plus neutrals.  
• Favor higher contrast for critical interactive items (buttons, links).

---

## 3. Typography

• Choose a clean, sans-serif font (e.g., Inter, Roboto, or system fonts) for both headings and body text.  
• Use consistent heading structure: H1 for page titles, H2/H3 for subsections, 16px (1rem) base font size for body text.  
• Minimal text decoration; rely on font weight and size to create emphasis.

---

## 4. Layout & Spacing

• Keep layouts uncluttered: limit the number of columns/panels on the screen, especially on the main dashboard.  
• Maintain generous padding and margins (e.g., Tailwind's p-4, m-4) around critical sections.  
• Utilize visual separation (subtle borders, background shifts) to group related content without heavy outlines.

---

## 5. Iconography & Imagery

• Opt for simple, line-based or thin glyph icons.  
• Use images sparingly—avoid large hero images or illustrations that distract from primary platform functions (e.g., ticket listings, analytics).  
• If needed, incorporate small icons near textual elements (e.g., priority indicators) to enhance clarity.

---

## 6. Interactions & Micro-Animations

• Keep transitions minimal: short fade or slide effects for modals, dropdowns, or alerts.  
• Button hover states can include a slight color change or elevation to provide visual feedback.  
• Avoid large-scale or flashy animations that pull attention away from essential content (tickets, user actions).

---

## 7. Accessibility Considerations

• Complement [Tech Stack Rules](../tech-stack-rules.md) by retaining Radix UI's accessible components.  
• Ensure color contrasts meet or exceed WCAG standards (particularly for text and interactive elements).  
• Keep icon-based buttons labeled or accompanied by text for screen reader users.

---

## 8. Ties to Desktop-First & Product Needs

• Provide dense but organized layouts on desktop, ensuring tickets, dashboards, and admin panels use space efficiently.  
• Condense or reorganize content for smaller viewports without losing clarity or removing key functions.  
• Ensure the minimalist theme highlights essential support tasks (ticket creation, knowledge base search, admin insights) from the [Product Requirements](../project-info/product-requirements.md) in an uncluttered manner.

---

## 9. Maintaining Minimalism

• Permit new UI elements only if they add clear value.  
• Regularly evaluate pages for redundant text, decorative imagery, or overly complex patterns.  
• Align with developer guidelines (e.g., Shadcn's defaults, Tailwind utilities) to keep the styling consistent and streamlined.

By adhering to these minimalist theme principles, AutoCRM will provide a clear, focused user experience that prioritizes essential details while maintaining visual harmony and user friendliness. 