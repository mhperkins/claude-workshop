export const lesson08 = {
  id: 8,
  slug: 'workflows-automation',
  title: 'Workflows and Automation',
  technicalBar: 'Medium',
  concept: 'Claude Code can be wired into your environment so recurring tasks run with one command or happen automatically. The key is identifying the tasks you do every session and encoding them as protocols, hooks, or scheduled agents.',
  keyIdeas: [
    'Claude Code hooks: shell commands that run before or after Claude takes an action',
    'Skills and slash commands: reusable workflows you invoke by name',
    'File watchers: trigger processing when a file changes (no manual step)',
    'End-of-session protocols: the "save your work" step, defined once and run every time',
  ],
  compassExample: {
    label: 'The Sibelius watcher and end-of-session protocol',
    text: 'The Sibelius watcher auto-generates a score sidecar whenever a new MusicXML file appears in the scores/ folder. It starts at Windows login automatically via a .vbs file. The end-of-session protocol is a defined sequence: rewrite current state, append changelog, update project index. Same steps every time, zero overhead after it\'s defined.',
  },
  exercises: [
    {
      id: '08-a',
      title: 'Get Claude to write an end-of-session protocol',
      goal: 'Describe a project you\'re working on and get Claude to write a reusable end-of-session protocol: the exact steps to run at the end of every working session.',
      context: 'An end-of-session protocol answers: what state needs to be preserved, where does it live, and in what order should it be updated? Getting Claude to write this for your project saves you from reinventing it each time.',
      system: 'You are an expert at designing repeatable workflows for software development projects. You write protocols that are specific, ordered, and can be followed exactly without interpretation.',
      starterText: '',
      examplePrompt: 'Write an end-of-session protocol for this project:\n\nProject: A personal recipe manager web app\nStack: Vite + React, localStorage for data\nTracking files: CLAUDE.md (project index), CHANGELOG.md (running log of changes)\nTwo tracks: "UI work" (components, styles) and "data work" (store, parsing)\n\nThe protocol should:\n- Be a numbered list of exact steps\n- Specify which files to update and how (rewrite vs. append)\n- Handle the case where only one track was touched in a session\n- Be short enough to follow in under 5 minutes',
      reflection: 'Does the protocol specify the order of updates? Order matters. You update the detail files first, then the index. If Claude got it backwards, ask it to fix the ordering and explain why it matters.',
    },
    {
      id: '08-b',
      title: 'Get Claude to design a file watcher trigger',
      goal: 'Describe a file-based event in your workflow and get Claude to design a file watcher that responds to it automatically.',
      context: 'File watchers eliminate manual steps by triggering processing when a file changes. Designing one means identifying the trigger (file created/modified in a path), the action (what to run), and the output (where the result goes). Claude can design this clearly when given the concrete workflow.',
      system: 'You are a senior developer designing automation for a software workflow. You are specific about file paths, trigger conditions, and output destinations.',
      starterText: '',
      examplePrompt: 'Design a file watcher for this workflow:\n\nSituation: A composer exports scores as MusicXML files from notation software into a folder called scores/drafts/. Each time a new file appears, we want to automatically extract metadata (title, measure count, key signature, instrumentation) and save it as a JSON sidecar file with the same name and a .json extension.\n\nDescribe:\n1. What the watcher monitors (path, event type)\n2. What it does when triggered (pseudocode is fine)\n3. What the output JSON structure should look like\n4. How to handle the case where the MusicXML file is still being written when the watcher fires',
      reflection: 'Did Claude address the race condition in step 4? File watchers commonly fire before the file is fully written. What technique did it suggest, and is that appropriate for MusicXML files (which can be large)?',
    },
  ],
};
