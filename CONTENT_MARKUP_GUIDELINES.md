# Content Markup Guidelines

## Purpose

Use one shared inline markup rule for authored question text across the project.
This keeps content writing, rendering, and testing aligned as the repository grows.

## Official Inline Markup

Use these markers only inside authored question text:

- underline: `==...==`
- inline code or fixed answer chunks: `` `...` ``

Do not introduce new ad-hoc markers such as `__...__`, `<u>...</u>`, or custom bracket conventions unless this guide is updated first.

## Authoring Rules

- Use `==...==` only when the learner should actually see an underlined segment on screen.
- Keep the underlined span as short and precise as possible.
- Do not leave unmatched `==`.
- Do not mix multiple underline styles in the same page.
- If a page says `밑줄 친`, the source text should include an actual `==...==` segment.

## Rendering Rules

- Pages that render authored text should use the shared helper in `shared/text-markup.js`.
- Prefer `window.Korean3BTextMarkup.renderInlineMarkup(text)` instead of page-local regex replacements.
- Page-local CSS may style `.question-underline`, but the HTML conversion rule should stay shared.

## Validation Rules

- Do not crash learner-facing pages just because authored text has a markup mistake.
- Catch markup issues in tests or review checks, not with runtime `throw` for students.
- For pages with underline questions, add at least one UI test that confirms:
  - `.question-underline` appears in the DOM
  - raw `==` markers are not visible in the rendered text

## Adoption Checklist

When building or updating a page that renders question text:

1. Use the shared text markup helper.
2. Keep underline authoring in `==...==` form.
3. Add or update one smoke test if the page includes underline questions.
4. Avoid page-specific mini markup dialects.

## First Reference Page

The first reference implementation for this rule is `c14/mock-exam.html`.
