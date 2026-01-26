## 2024-05-22 - Icon-Only Buttons Accessibility Pattern
**Learning:** The builder interface extensively uses icon-only buttons for critical actions (add page, view toggle, close modal) but consistently missed `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Systematically check all icon-only buttons in `Sidebar`, `Toolbar`, and Modals for `aria-label` when working on UI components.
