# Claude Workshop — CLAUDE.md

> Project memory for Claude Code. Read this before doing anything else in this project.

**Update protocol:** When Max says "update current state," update the Current State section above to reflect what was just built, then prepend a new dated entry to `CHANGELOG.md`.

---

## What This Is

An interactive web app that teaches a 10-class curriculum: "Build Your Own Tools with AI." Each class has lesson content (concept, key ideas, a real example from Composer's Compass) and 2-3 exercises. Exercises give the student a goal and ask them to write a prompt that gets Claude to accomplish it. The student types their prompt, clicks Run, sees Claude's streaming response, then compares against an example prompt they can reveal.

The app was built in Session 1 (2026-05-29). All 10 lessons are fully written with complete exercise content. The app builds and runs.

**Run it (both servers, one command from root):**
```
npm run dev
```
Or separately:
```
# Terminal 1 — API proxy
cd server && npm run dev

# Terminal 2 — Vite frontend
cd app-ui && npm run dev
```
Frontend opens on `http://localhost:5174` (fixed in vite.config.js). Server runs on port 3001. API key goes in `server/.env`.

**Preview inside VS Code:** with the dev server running, open the app in VS Code's built-in Simple Browser (`Cmd/Ctrl+Shift+P` → "Simple Browser: Show" → enter the localhost URL) instead of an external browser. It's an embedded Chromium webview tab, so the app lives next to the editor and HMR updates show live. Note: if port 5174 is taken, Vite falls back to the next free port (5175, 5176, ...) — check the terminal output for the actual URL.

---

## Current State

**Status: Session 5 complete.** Carousel navigation upgraded to floating side arrows. Prompt text now persists across slide navigation.

**What works:**
- ApiKeyGate: splash screen ("Start the course"), stores `workshop:started` flag in localStorage. No API key entry needed (key lives in server `.env`).
- CourseHome: 10-class grid with progress badges (done/total per lesson). "Reset progress" button top-right. "CLAUDE.md Generator" bonus tool card.
- LessonView: carousel-based, single-column, centered (max 720px). Slide 0 = lesson intro. Slides 1..N = exercises. Final slide = completion card (locked until all exercises done). Dot nav bar at top shows completion state per slide. Floating `‹`/`›` arrow buttons on left/right edges of the slide area (replaced the bottom Prev/Next bar). Keyboard: Escape = back, ArrowLeft/Right = prev/next slide. CSS translateX slide-in animation (directional). Prompt text per exercise cached in `promptCache` state and passed back via `initialPrompt`/`onPromptChange`, so typing survives navigating between slides.
- ExerciseRunner: prompt textarea (controlled by parent cache), Run button, streaming output rendered via `MarkdownOutput`, reflection question, "Show example prompt" toggle, "Mark complete" button
- MarkdownOutput: custom markdown renderer (h1-h3, bold, italic, inline code, fenced code blocks, unordered/ordered lists)
- ClaudeMdGenerator: bonus tool (accessible from CourseHome), guides user through generating a CLAUDE.md for their own project
- Express proxy server (`server/`): handles all Anthropic API calls on port 3001. API key in `server/.env`. SSE streaming proxied back to browser.
- Progress persisted in localStorage across refreshes. Reset progress button wired in CourseHome.

**What is not built yet:**
- Mobile layout (desktop-first for now)
- Instructor/cohort view
- Auth or accounts

---

## Architecture

| Layer | Detail |
|-------|--------|
| Framework | Vite + React (plain JS, no TypeScript) |
| Styling | CSS modules per component + design tokens in `src/styles/tokens.css` |
| Fonts | Cormorant Garamond + DM Sans via Google Fonts |
| API | Browser fetches `http://localhost:3001/api/chat`. Express server in `server/` proxies to Anthropic using key from `server/.env`. SSE stream forwarded back. |
| Data | Lesson content in `src/data/lessons/lesson*.js`. Progress in localStorage under `workshop:progress`. Started flag under `workshop:started`. |

---

## File Map

```
claude-workshop/
├── server/
│   ├── index.js                       # Express proxy: POST /api/chat → Anthropic SSE
│   ├── package.json
│   └── .env                           # ANTHROPIC_API_KEY (not committed)
└── app-ui/
    ├── vite.config.js                  # port 5174
    └── src/
        ├── main.jsx                    # entry point, imports tokens.css
        ├── styles/
        │   └── tokens.css             # all design tokens (colors, fonts, shadows)
        ├── agent/
        │   └── callAgent.js           # fetches localhost:3001/api/chat, reads SSE stream
        ├── store/
        │   └── progressStore.js       # load/save/mark/isComplete/countCompleted/resetProgress
        ├── data/
        │   ├── index.js               # exports lessons array + getLessonById()
        │   └── lessons/
        │       ├── lesson01.js        # How to Talk to Claude (2 exercises)
        │       ├── lesson02.js        # Brainstorming (2 exercises)
        │       ├── lesson03.js        # Markdown (2 exercises)
        │       ├── lesson04.js        # Project Memory (2 exercises)
        │       ├── lesson05.js        # Front-End Development (2 exercises)
        │       ├── lesson06.js        # Back-End and API Integration (2 exercises)
        │       ├── lesson07.js        # Training and Evaluation (2 exercises)
        │       ├── lesson08.js        # Workflows and Automation (2 exercises)
        │       ├── lesson09.js        # Troubleshooting (2 exercises)
        │       └── lesson10.js        # Capstone (3 exercises)
        └── components/
            ├── App.jsx                # root: ApiKeyGate wraps CourseHome or LessonView
            ├── ApiKeyGate.jsx         # splash screen; sets workshop:started in localStorage
            ├── CourseHome.jsx         # 10-card grid with progress badges
            ├── LessonView.jsx         # slide nav: intro → exercises → completion; keyboard shortcuts
            ├── ExerciseRunner.jsx     # goal + context + prompt textarea + run + MarkdownOutput
            └── MarkdownOutput.jsx     # custom markdown renderer for Claude response panel
```

Each `.jsx` has a companion `.module.css` in the same directory.

---

## Lesson Data Shape

Every lesson file exports one object. Every exercise has these fields:

```js
{
  id: 'NN-a',           // used for progress tracking
  title: string,
  goal: string,         // shown in amber callout — what Claude should produce
  context: string,      // why this exercise teaches what it teaches
  system: string,       // read-only system prompt shown to student
  starterText: string,  // pre-filled in textarea (often empty)
  examplePrompt: string,// revealed only after student clicks Run
  reflection: string,   // shown after first successful run
}
```

---

## Coding Conventions

Same rules as Composer's Compass:

- **No TypeScript.** Plain JavaScript throughout.
- **Named exports only.** No `export default` for components.
- **One component per file.** Filename matches export name.
- **CSS modules** for all component styles. No inline `style={{}}` except truly dynamic values.
- **All design tokens** in `src/styles/tokens.css`. No hardcoded color or font values anywhere else.
- **All API calls through `callAgent()`.** Never call Anthropic directly from a component.
- **No comments** unless the WHY is non-obvious.

---

## Design Tokens (key ones)

```
--amber: #B45309       primary action color (Run button, goal callout border)
--amber-bg: #FEF3C7    goal callout background
--cream: #FAF8F5       page background
--warm: #EDE9E3        context panels, example prompt background
--ch: #1C1917          dark output panel background
--border: #E2DDD6      card and input borders
--font-serif: Cormorant Garamond   headers, titles
--font-sans: DM Sans               body, UI
```

---

## callAgent.js Pattern

```js
await callAgent({
  system: exercise.system,           // string
  messages: [{ role: 'user', content: prompt }],
  onChunk: (text) => { /* append to output state */ },
  signal: abortController.signal,
});
```

Posts to `http://localhost:3001/api/chat`. No API key in the browser. Throws on network error or non-200 response with a human-readable message.

---

## What's Next (possible)

These are ideas, not committed work. Pick up any of them in a future session:

1. **Instructor view:** a separate `/instructor` route that shows aggregate progress across a class cohort (requires a backend)
2. **Mobile layout:** the current LessonView stacks poorly below 900px

---

## Origin

Built in one session from the curriculum document `claude-workshop-curriculum.md` (a 10-class workshop outline). The parent project that supplies the real-world examples is Composer's Compass at `C:\Users\maxwe\OneDrive\Desktop\Claude\Apps and Tools\Composition_Hub_Tool\composers-compass\`.
