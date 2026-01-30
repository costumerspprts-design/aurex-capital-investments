## 2024-05-22 - Form Accessibility Pattern
**Learning:** Form inputs in modals often lack `id` and `htmlFor` associations, making them inaccessible.
**Action:** When touching forms, implement the standard pattern: Label (with `htmlFor`) + Input (with `id` and `aria-describedby`) + Helper Text (with `id`).
