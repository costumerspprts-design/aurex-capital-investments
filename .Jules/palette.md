## 2024-05-22 - Form Accessibility in Modals
**Learning:** Form inputs in the SEO Settings modal relied on visual proximity for labeling but lacked programmatic association (`htmlFor` + `id`), making them inaccessible to screen readers.
**Action:** Always verify that every `<input>` has a corresponding `<label>` with a matching `htmlFor` attribute, especially in shadcn/radix primitives or custom modals.
