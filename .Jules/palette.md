## 2026-01-28 - Form Label Association
**Learning:** Inputs in this codebase often use `<label>` with `mb-1` for visual styling but lack `htmlFor`/`id` association, making them inaccessible to screen readers.
**Action:** Always check `htmlFor` and `id` pairing when touching form components.
