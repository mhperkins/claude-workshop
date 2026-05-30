# Claude Workshop — Changelog

Entries are newest-first. Each entry corresponds to a "update current state" checkpoint.

---

## 2026-05-29 — Session 5: Side-arrow carousel nav + prompt persistence

**What was built:**
- `LessonView`: replaced the bottom Prev/Next nav bar with floating `‹`/`›` arrow buttons on the left/right edges of the slide area. Wrapped the track in a `.slideArea` flex container; arrows are absolutely positioned and vertically centered, disabled at the first/last slide.
- Prompt persistence: lifted prompt text into a `promptCache` state object in `LessonView` keyed by exercise ID. `ExerciseRunner` now takes `initialPrompt` + `onPromptChange` props so typed text survives navigating to another slide and back (previously lost on remount via `key`).
- CLAUDE.md "Run it" section: documented the VS Code Simple Browser preview workflow and the Vite port-fallback behavior.

**Status after session:** Carousel nav refined. Unsubmitted prompt text no longer lost on navigation.

---

## 2026-05-29 — Session 4: Backend proxy confirmed, all features verified live

**What was built / confirmed:**
- Backend proxy server started and verified running on port 3001. API key moved from browser localStorage to `server/.env`.
- `ApiKeyGate` confirmed: splash screen only, no key entry.
- Root `package.json` added with `concurrently`-based `npm run dev` to start both servers from one command.
- All 5 remaining "What's Next" features confirmed built: keyboard shortcuts, markdown output, lesson completion screen, progress reset button, CLAUDE.md generator.
- CLAUDE.md "Run it" section updated to reflect two-server setup. "What's Next" pruned of completed items.

**Status after session:** All planned features complete. Two remaining items: instructor view (needs backend) and mobile layout.

---

## 2026-05-29 — Session 3: Carousel lesson navigation

**What was built:**
- `LessonView` converted from two-column grid to single-column carousel. Replaced `display: grid` with a full-viewport flex column: sticky top bar (back + dots + label), scrollable slide track, sticky bottom nav (Prev/Next).
- Slide track content centered at max 720px with directional CSS `translateX` animation on each slide transition.
- `ClaudeMdGenerator` bonus tool confirmed wired: accessible from CourseHome via its own card.
- Reset progress button confirmed live in CourseHome top-right.

**Status after session:** Carousel nav complete. All known-built features documented.

---

## 2026-05-29 — Session 2: Backend proxy, markdown rendering, slide navigation

**What was built:**
- `server/`: Express proxy on port 3001 handles all Anthropic API calls (key in `.env`, SSE forwarded to browser)
- `callAgent.js` rerouted from direct browser fetch to `localhost:3001/api/chat`
- `ApiKeyGate` simplified to a splash/welcome screen. No longer collects an API key.
- `MarkdownOutput` component: custom renderer for headings, bold, italic, inline code, fenced code blocks, lists
- `ExerciseRunner` output panel now uses `MarkdownOutput` instead of plain text
- `LessonView` rebuilt: slide-based (intro slide + exercise slides + completion slide), dot nav with done indicators, keyboard shortcuts (Escape/ArrowLeft/ArrowRight), animated transitions, completion card
- `progressStore.js`: added `resetProgress()` export (not yet wired to a UI button)

**Status after session:** Backend in place. Markdown rendering live. Lesson nav and completion flow complete.

---

## 2026-05-29 — Session 1: Initial build

**What was built:**
- Full app scaffolded: Vite + React, CSS modules, design tokens
- ApiKeyGate, CourseHome, LessonView, ExerciseRunner components
- callAgent.js with SSE streaming to Anthropic API
- progressStore.js with localStorage persistence
- All 10 lessons written with complete exercise content (21 exercises total)
- Build passes clean, golden path verified

**Status after session:** MVP complete. Desktop-only. No backend.
