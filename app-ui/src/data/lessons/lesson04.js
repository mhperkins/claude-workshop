export const lesson04 = {
  id: 4,
  slug: 'project-memory',
  title: 'Project Memory and Context Management',
  technicalBar: 'Low',
  concept: 'Claude has no memory between sessions. Your job is to build a memory system it can read. CLAUDE.md is a living project brief: the single document that lets every new session pick up where the last one left off.',
  keyIdeas: [
    'Context decay is the number one productivity killer with AI tools',
    'CLAUDE.md is a project brief, not documentation. It stays lean and current.',
    'Separate durable knowledge (memory files) from ephemeral state (conversation)',
    'An end-of-session update protocol is what keeps the system working across dozens of sessions',
  ],
  compassExample: {
    label: 'The five-file memory architecture',
    text: 'Composer\'s Compass uses five memory files: CLAUDE.md (index), ui-ux/CLAUDE.md (full UI state), training/CLAUDE.md (training state), and two changelogs. Every session ends with an update protocol specifying which files to rewrite and which to append. The rule "read CLAUDE.md before anything else" is the entire reason sessions do not start from scratch.',
  },
  exercises: [
    {
      id: '04-a',
      title: 'Get Claude to write a CLAUDE.md',
      goal: 'Describe a project you\'re working on and get Claude to write a CLAUDE.md file for it.',
      context: 'A CLAUDE.md is a project brief for Claude Code. It tells the AI what the project is, what the current state is, what files matter, and what rules to follow. Getting Claude to draft one saves you from staring at a blank page.',
      system: 'You are an expert software developer who writes excellent project documentation for AI coding assistants. You write CLAUDE.md files that are lean, current, and actionable.',
      starterText: '',
      examplePrompt: 'Write a CLAUDE.md for this project:\n\nProject: A personal finance tracker web app\nStack: Vite + React, no backend, localStorage for data\nCurrent state: The app has a working expense entry form and a list view. Next up is adding monthly totals and a simple chart.\nKey rules: No TypeScript, named exports only, CSS modules for styles, all data through a single store file.\n\nKeep it under 300 words. Focus on current state and rules, not history.',
      reflection: 'Is the output lean enough to scan in 30 seconds? A good CLAUDE.md is a brief, not a doc. If yours is over 400 words, ask Claude to cut it by half while keeping all the rules.',
    },
    {
      id: '04-b',
      title: 'Get Claude to audit a CLAUDE.md for gaps',
      goal: 'Show Claude a CLAUDE.md and get it to identify what\'s missing or out of date.',
      context: 'A CLAUDE.md that has not been updated in a week is already drifting from reality. Getting Claude to audit an existing brief against common failure modes is faster than reviewing it yourself.',
      system: 'You are a senior developer reviewing a CLAUDE.md file for an AI coding assistant. You know what information an AI needs to be productive on a project, and you spot gaps precisely.',
      starterText: `Here's a CLAUDE.md to audit:\n\n---\n# My App\n\nA to-do list app built with React.\n\n## Files\n- App.jsx: main component\n- store.js: handles data\n\n## Rules\n- Use functional components\n---\n\nWhat's missing?`,
      examplePrompt: `Here's a CLAUDE.md to audit:\n\n---\n# My App\n\nA to-do list app built with React.\n\n## Files\n- App.jsx: main component\n- store.js: handles data\n\n## Rules\n- Use functional components\n---\n\nIdentify exactly what information is missing that would cause an AI assistant to make mistakes or ask unnecessary questions. For each gap, write one sentence describing what should be there and why it matters.`,
      reflection: 'How many gaps did Claude find? The most common missing pieces are: current state, what\'s next, styling rules, and how data is persisted. Did yours have all of those?',
    },
  ],
};
