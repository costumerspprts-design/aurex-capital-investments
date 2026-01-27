## 2024-05-22 - [Form Accessibility Gaps]
**Learning:** Found critical accessibility gap in modals where inputs lacked `id` and labels lacked `htmlFor`, breaking screen readers and testing tools.
**Action:** Always verify `htmlFor` matches `id` when modifying forms, even if visually correct.
