# Asset Path Guidelines

## Purpose

This project stores lesson assets by chapter first, then by teaching area.
Use the same structure for all future chapters and migrations.

## Standard Structure

Each chapter must use this top-level layout:

```text
assets/
  c10/
    vocabulary/
    grammar/
    listening/
    reading-writing/
    misc/
```

Inside each category, split by media type when needed:

```text
assets/cXX/<category>/images/
assets/cXX/<category>/audio/
```

If a category has no live assets yet, keep the folder with `.gitkeep`.

## Category Rules

Use these category names only:

- `vocabulary`
- `grammar`
- `listening`
- `reading-writing`
- `misc`

Classify assets by the activity that uses them:

- `vocabulary`: flashcards, vocabulary quiz images, choseong/masked vocabulary variants
- `grammar`: grammar-only games, drills, prompts, grammar visuals
- `listening`: listening images, audio, scripts packaged as assets
- `reading-writing`: reading images, writing-cut images, read-and-write shared visuals
- `misc`: review bundles or shared asset pools used by more than one category

## Shared Asset Rule

If the same asset set is used across two or more categories, store it under `misc`.

Examples:

- `assets/c12/misc/images/split-variants/`
- `assets/c12/misc/images/split-variants-35/`

Do not duplicate the same image set into `vocabulary`, `grammar`, and `reading-writing` just to match page names.

## Naming Rules

- Use English folder names only.
- Prefer kebab-case for folder names.
- Keep existing file names when migration cost is high.
- When creating new grouped asset folders, prefer descriptive names like `writing-cut`, `review-quiz`, `split-variants`.

## Migration Checklist

When adding or importing assets:

1. Identify every HTML/JS file that references the asset set.
2. Decide whether the set is single-category or shared.
3. Move the files into the standard category path.
4. Update all references in HTML, JS, JSON, and inline strings.
5. Remove empty legacy folders like `assets/cXX/images` or `assets/cXX/audio`.
6. Keep local-only source material in `backup/asset-sources/`, not in live lesson folders.

## Current Examples

- `assets/c10/listening/images/listen1pic-lite.webp`
- `assets/c10/reading-writing/images/writing-cut/`
- `assets/c10/misc/images/review-quiz/`
- `assets/c11/vocabulary/images/split/`
- `assets/c11/reading-writing/images/writing-cut/`
- `assets/c12/misc/images/split-variants/`
- `assets/c13/vocabulary/images/split-variants/`

## Do Not Do

- Do not place new live assets directly under `assets/cXX/images/` or `assets/cXX/audio/`.
- Do not keep imported source PNGs inside lesson folders like `cXX/`.
- Do not create versioned live asset folders like `writing_cut_v2` once the final route is standardized.
