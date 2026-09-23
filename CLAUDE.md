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

**Status: Session 6 complete.** Annotated claude.ai diagrams on all 10 lessons. Whole-codebase audit done with fixes applied. Project pushed to a public GitHub repo.

**Repo:** https://github.com/mhperkins/claude-workshop (public, remote `origin`, default branch `main`).

**What works:**
- ApiKeyGate: splash screen ("Start the course"), stores `workshop:started` flag in localStorage. No API key entry needed (key lives in server `.env`).
- CourseHome: 10-class grid with progress badges (done/total per lesson). "Reset progress" button top-right. "CLAUDE.md Generator" bonus tool card.
- LessonView: carousel-based, single-column, centered (max 720px). Slide 0 = lesson intro (now includes an annotated diagram). Slides 1..N = exercises. Final slide = completion card (locked until all exercises done). Dot nav bar at top shows completion state per slide. Floating `‹`/`›` arrow buttons on left/right edges of the slide area. Keyboard: Escape = back, ArrowLeft/Right = prev/next slide. CSS translateX slide-in animation (directional). Prompt text per exercise cached in `promptCache` state and passed back via `initialPrompt`/`onPromptChange`, so typing survives navigating between slides.
- AnnotatedScreenshot: data-driven claude.ai chat mockup with clickable numbered annotation pins → popovers. Renders a `mockup` object (system/user/response blocks: `text`, `code`, `bullets`) from each lesson's `illustration`. All 10 lessons have one; each shows that lesson's artifact (idea list, markdown template, CLAUDE.md, component, parser, etc.). Fixed 320px canvas keeps pin %-coordinates stable; popovers escape the frame (mockup carries the `overflow:hidden`, not the frame).
- ExerciseRunner: prompt textarea (controlled by parent cache), Run button, streaming output via `MarkdownOutput`, reflection, "Show example prompt" toggle, "Mark complete", plus "Try in Claude.ai" which opens claude.ai and shows `CompanionPanel`.
- CompanionPanel: floating dark panel with copyable system prompt / starter text, for doing the exercise in real claude.ai.
- MarkdownOutput: custom markdown renderer (h1-h3, bold, italic, inline code, fenced code blocks, unordered/ordered lists).
- ClaudeMdGenerator: bonus tool (accessible from CourseHome), guides user through generating a CLAUDE.md for their own project.
- Express proxy server (`server/`): handles all Anthropic API calls on port 3001. Validates input, anchors CORS to localhost, aborts the upstream stream on client disconnect, exits at startup if the key is missing. `callAgent` surfaces server error events to the user.
- Progress persisted in localStorage across refreshes.

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
├── .gitignore                          # root: ignores .env, .env.local, node_modules, dist
├── package.json                        # root: `npm run dev` runs both servers via concurrently
├── server/
│   ├── index.js                       # Express proxy: POST /api/chat → Anthropic SSE (hardened)
│   ├── package.json
│   ├── .env.example                   # placeholder (committed)
│   └── .env                           # ANTHROPIC_API_KEY (gitignored)
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
            ├── App.jsx                # root: ApiKeyGate → CourseHome | LessonView | ClaudeMdGenerator
            ├── ApiKeyGate.jsx         # splash screen; sets workshop:started in localStorage
            ├── CourseHome.jsx         # 10-card grid + bonus tool card; reset progress
            ├── LessonView.jsx         # slide nav: intro(+diagram) → exercises → completion; keyboard + prompt cache
            ├── ExerciseRunner.jsx     # goal + context + prompt textarea + run + MarkdownOutput + Try in Claude.ai
            ├── AnnotatedScreenshot.jsx# data-driven claude.ai mockup + annotation pins/popovers
            ├── CompanionPanel.jsx     # floating panel: copyable system/starter text for claude.ai
            ├── ClaudeMdGenerator.jsx  # bonus tool: generate a CLAUDE.md from Q&A
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

Each lesson also has an optional `illustration` rendered on the intro slide by `AnnotatedScreenshot`:

```js
illustration: {
  src: null,            // null → render the CSS mockup; a URL → render an <img>
  alt: string,
  mockup: {
    model: string,      // optional, defaults to 'Claude Sonnet'
    system: string,     // system bubble
    user: string,       // user bubble
    response: [         // assistant bubble, ordered blocks
      { type: 'text', text: string },
      { type: 'code', filename?: string, code: string },
      { type: 'bullets', items: string[] },
    ],
  },
  annotations: [ { x, y, label, text } ],  // x/y are % over a fixed 320px canvas
}
```

Authoring rule: keep mockup content short enough to fit the fixed canvas (code ≤4 lines, bullets ≤4, system/user 1-2 lines) so pins stay aligned and nothing clips.

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

---

## End-of-Session Protocol

> 🚨 **"update current state" = FOUR steps, ALWAYS. Not two.** Docs alone is an incomplete response.
> Steps **3 (commit and push)** and **4 (delivery slide)** are **NON-NEGOTIABLE** and the most often
> forgotten. If you are about to reply after only steps 1 and 2, STOP. You are not done.

When Max says "update current state", do all four automatically, with no separate prompt. Do not stop,
do not ask, do not report back until all four are complete.

1. **Rewrite the Current State section of this file.** Replace it with this session's snapshot. Prune finished items, add new
   ones. Overwrite, do not append.
2. ****Add a `CHANGELOG.md` entry** at the project root: what changed, why, the effort level and the date. Newest at the top. If nothing changed, write the date, the topic and the conclusion in a short entry.**
3. **➡️ COMMIT AND PUSH (do not skip).** Use the **PowerShell tool** for all git. Stage the
   session's work **by name, never `-A`**, or a parallel session's uncommitted work gets swept in under
   a message that does not mention it. Commit on **`main`** with a clear message ending in the
   `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>` line, then
   `git push origin main`. `CLAUDE.md` **is tracked here**, so the rewritten Current State goes into the commit.
4. **➡️ BUILD THE DELIVERY SLIDE (do not skip).** One self-contained HTML slide detailing what was
   committed and pushed: cards, badges, icons, the commit hash and the branch, built fresh in this
   project's palette. Save it to ``docs/deliveries/<YYYY-MM>/<YYYY-MM-DD>/`` with a date-prefixed filename (create the month folder on the month's first delivery, the date folder on the day's first), and name
   the path in the reply. Every delivery from one day shares that day's folder.

**Self-check before replying:** Did I commit? Did I push? Did I write the slide? If any answer is no,
the protocol is unfinished.

**The canonical version is in `~/.claude/CLAUDE.md`** under "End-of-Session Protocol (every project)".
This copy carries it in full on purpose, so this project never depends on that file being loaded. Where
the two differ, **this file wins**, because the values above are this project's.
