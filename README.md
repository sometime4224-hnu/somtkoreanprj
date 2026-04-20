# SOMT Korean Project

Korean learning materials and interactive web activities published through GitHub Pages.

## Rights Notice

This repository is public for viewing and deployment, but it is not open source by default.

- Copyright 2026 SOMT Korean Project. All rights reserved.
- Unless a file or notice says otherwise, the repository owner claims rights only in original source code, page structure, UI/layout, and owner-created project assets.
- Third-party textbook-derived text, publisher audio, trademarks, and any other third-party materials remain the property of their respective rights holders and are not relicensed by this repository.
- If you want to reuse any material beyond normal web viewing, obtain permission from the relevant rights holder first.

See [LICENSE.md](LICENSE.md) for the full notice and terms of use.

## Repository Housekeeping

Keep the repository root focused on deployable pages, chapter folders, shared code, and core project docs.

- Prefer `../backup/korean3Bimprove/YYYYMMDD/` outside the repository for archival captures, screenshots, ZIP exports, one-off extracts, and manual backups.
- Use `tmp/`, `output/`, `.codex_tmp/`, and any repo-internal `backup/` folder only as short-lived staging areas when work is still in progress.
- Avoid leaving loose debug PNG files at the repository root.
- Avoid relying on local-only ignore rules in `.git/info/exclude` for files that should simply live outside the repository.
- Keep generated caches such as `__pycache__/`, test artifacts, and local build output out of Git.

## Shared Content Rules

When a page renders authored question text, use the shared inline markup rule described in [CONTENT_MARKUP_GUIDELINES.md](CONTENT_MARKUP_GUIDELINES.md).
