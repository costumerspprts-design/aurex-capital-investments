## 2024-05-22 - Sidebar Navigation Semantics
**Learning:** Custom sidebar tabs often use simple `div`s or `button`s without proper ARIA roles, making them confusing for screen readers which don't announce them as tabs.
**Action:** Always wrap tab groups in `role="tablist"` and apply `role="tab"` and `aria-selected` to the individual triggers.
