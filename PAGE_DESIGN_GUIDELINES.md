# Page Design Guidelines

## Purpose

Use one shared set of page-design rules across the project.
These rules should keep learner pages efficient, intuitive, and consistent on both desktop and mobile.

## Core Principles

- Prioritize learning actions over explanatory chrome.
- Preserve screen space for the task the learner must do now.
- Design for both desktop and smartphone portrait view from the start.
- Teach page flow through layout, hierarchy, motion, and emphasis before using text.

## Meta Description Ban

Do not add meta-description text that the learner does not need in order to study.

This includes:

- page-intent summaries
- format explanations
- author-facing structure notes
- "this page is for ..." style framing text
- long hero subtitles that explain the page concept rather than the learning task

If a line does not directly help the learner answer, listen, speak, read, or interact, remove it by default.

## Grammar Main Page Exception

Grammar main pages must keep grammar-learning explanations sufficiently complete.

For grammar main pages:

- Provide enough explanation for the learner to understand the grammar point itself, not just the activity flow.
- Explain grammar meaning, form, usage, and key contrasts as clearly and simply as possible.
- Prefer easy, learner-friendly wording and structured chunks over compressed or overly abstract summaries.
- Do not remove essential grammar explanations in the name of efficiency.
- If space must be saved, reduce decorative chrome, repeated framing text, or non-learning UI before cutting grammar instruction.

The meta-description ban does not apply to explanation that is directly needed for grammar learning.
On grammar main pages, explanation related to the target grammar should be thorough, easy, and clear.

## Space Efficiency Rules

- Use the top portion of the page for the core task, not for decoration or explanation.
- Avoid large hero cards on learner-facing activity pages unless the hero itself is the activity.
- Keep top bars compact.
- Reduce padding, gaps, and card stacking when they do not improve comprehension.
- Collapse optional help content by default when it is not needed for first-view execution.
- Prefer summary-first result layouts over large multi-card feedback blocks.

## Responsive Layout Rules

- Every learner page must be usable in desktop width and smartphone portrait width.
- Treat smartphone portrait as a primary target, not a fallback.
- The first mobile viewport should expose the learner's next action as clearly as possible.
- Avoid designs that require long initial scrolling before the learner reaches the task.
- Check that key controls remain visible, tappable, and visually grouped on narrow screens.

## Instruction Design Rules

- Do not rely on long text instructions to teach page use.
- Prefer UI affordances, grouping, button labels, iconography, motion, highlight, and progressive disclosure.
- Use visual emphasis and effects to direct attention to the current action.
- When guidance is needed, prefer stage-based focus cues over persistent explanation panels.
- Use text instructions only when the task genuinely cannot be made self-evident through the interface.

## Visual Guidance Rules

- Use highlights, pulse, wave, contrast, reveal order, and auto-scroll to guide attention.
- Focus guidance on the learner's current target only.
- Avoid showing multiple competing emphasis effects at once.
- Auto-scroll should move to the learner's current work region, not just to arbitrary section starts.
- Visual guidance must support the task without covering or crowding the content.

## Content Hierarchy Rules

- Put the question, prompt, or target content before secondary explanation.
- Keep optional tips, notes, and supporting references below the main action area when possible.
- Remove duplicate labels, repeated explanations, and redundant status text.
- If a learner has likely done the activity type before, default to less explanation, not more.

## Mock Exam Pages

- Question tags should show only broad, useful categories such as `어휘` and `문법`.
- Do not show the target vocabulary word, target grammar pattern, focus label, or answer clue as a pre-answer question tag.
- Target/focus labels may appear after grading in feedback or review summaries when they help the learner decide what to study next.

## Standardization Rules

- When a page type already has a project standard, extend that standard instead of inventing a new layout.
- Update the relevant standard document when the standard itself changes.
- Keep shared interaction patterns and shared styling in common files whenever possible.

## Speaking Pages

Speaking pages must also follow [SPEAKING_PAGE_GUIDELINES.md](SPEAKING_PAGE_GUIDELINES.md).
