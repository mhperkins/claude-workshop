# Claude Workshop — CLAUDE.md

> Project memory for Claude Code. Read this before doing anything else in this project.

---

## What This Is

An interactive web app that teaches a 10-class curriculum: "Build Your Own Tools with AI." Each class has lesson content (concept, key ideas, a real example from Composer's Compass) and 2-3 exercises. Exercises give the student a goal and ask them to write a prompt that gets Claude to accomplish it. The student types their prompt, clicks Run, sees Claude's streaming response, then compares against an example prompt they can reveal.

The app was built in Session 1 (2026-05-29). All 10 lessons are fully written with complete exercise content. The app builds and runs.

**Run it:**
```
cd app-ui
npm run dev
```
Opens `http://localhost:5174`. (Port 5174 is fixed in vite.config.js to avoid conflict with Composer's Compass on 5173.)

---

## Current State

**Status: MVP complete.** All screens built, all 10 lessons fully written, build passes clean, golden path verified.

**What works:**
- ApiKeyGate: user enters their Anthropic API key once, stored in localStorage
- CourseHome: 10-class grid with progress badges (done/total per lesson)
- LessonView: two-column layout (lesson content left, exercise right)
- ExerciseRunner: prompt textarea, Run button, streaming output, reflection question, "Show example prompt" toggle, "Mark complete" button
- Progress persisted in localStorage across refreshes

**What is not built yet:**
- Mobile layout (desktop-first for now)
- Instructor/cohort view
- Auth or accounts
- Any backend

---

## Architecture

| Layer | Detail |
|-------|--------|
| Framework | Vite + React (plain JS, no TypeScript) |
| Styling | CSS modules per component + design tokens in `src/styles/tokens.css` |
| Fonts | Cormorant Garamond + DM Sans via Google Fonts |
| API | Direct browser fetch to Anthropic API (`api.anthropic.com/v1/messages`) with `anthropic-dangerous-direct-browser-access: true` header. User provides their own key. |
| Data | Lesson content in `src/data/lessons/lesson*.js`. Progress in localStorage under `workshop:progress`. API key under `workshop:api-key`. |

---

## File Map

```
claude-workshop/
└── app-ui/
    ├── vite.config.js                  # port 5174
    └── src/
        ├── main.jsx                    # entry point, imports tokens.css
        ├── styles/
        │   └── tokens.css             # all design tokens (colors, fonts, shadows)
        ├── agent/
        │   └── callAgent.js           # single API call function, SSE stream reader
        ├── store/
        │   └── progressStore.js       # load/save/mark/isComplete via localStorage
        ├── data/
        │   ├── index.js               # exports lessons array + getLessonById()
        │   └── lessons/
        │       ├── lesson01.js        # How to Talk to Claude (2 exercises, fully written)
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
            ├── ApiKeyGate.jsx         # key entry screen; persists to localStorage
            ├── CourseHome.jsx         # 10-card grid with progress badges
            ├── LessonView.jsx         # two-column: content left, ExerciseRunner right
            └── ExerciseRunner.jsx     # goal + context + prompt textarea + run + output
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

The function reads `localStorage.getItem('workshop:api-key')` internally. Throws on bad key or API error with a human-readable message.

---

## What's Next (possible)

These are ideas, not committed work. Pick up any of them in a future session:

1. **Navigation improvement:** add keyboard shortcuts (Escape to go back, arrow keys for prev/next exercise)
2. **Better output rendering:** render markdown in the Claude response panel instead of plain text
3. **Lesson completion screen:** when all exercises in a lesson are done, show a summary card before going back
4. **Progress reset:** a "Reset progress" button in a settings panel (currently requires clearing localStorage manually)
5. **CLAUDE.md generation tool:** a bonus feature where the app helps you write a CLAUDE.md for your own project (uses Class 4 as the exercise)
6. **Instructor view:** a separate `/instructor` route that shows aggregate progress across a class cohort (requires a backend)
7. **Mobile layout:** the current two-column LessonView stacks poorly below 900px

---

## Origin

Built in one session from the curriculum document `claude-workshop-curriculum.md` (a 10-class workshop outline). The parent project that supplies the real-world examples is Composer's Compass at `C:\Users\maxwe\OneDrive\Desktop\Claude\Apps and Tools\Composition_Hub_Tool\composers-compass\`.
