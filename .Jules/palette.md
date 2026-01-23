## 2024-05-23 - Sidebar Tabs Accessibility
**Learning:** The application uses custom tab implementations (divs + buttons) in sidebars without semantic ARIA roles (`tablist`, `tab`, `tabpanel`).
**Action:** When working on sidebars or tabbed interfaces in this codebase, always check for missing `role="tab"` and `aria-selected` attributes, as the default components don't seem to include them.
