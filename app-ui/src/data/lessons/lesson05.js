export const lesson05 = {
  id: 5,
  slug: 'front-end',
  title: 'Front-End Development',
  technicalBar: 'Medium',
  concept: 'Claude Code writes components when you give it a spec. Your job is to write good specs and review the output. The conventions you establish (CSS modules, named exports, design tokens) make Claude\'s output consistent and reviewable.',
  illustration: {
    src: null,
    alt: 'Claude chat where the user gives a component brief and Claude returns the React JSX',
    mockup: {
      model: 'Claude Sonnet',
      system: 'Expert React dev. CSS modules, named exports, colors from CSS variables.',
      user: 'Write a StatusBadge component. Props: status, label. Color by status.',
      response: [
        { type: 'code', filename: 'StatusBadge.jsx', code: 'export function StatusBadge({ status, label }) {\n  return <span className={styles[status]}>{label}</span>;\n}' },
      ],
    },
    annotations: [
      {
        x: 50, y: 25,
        label: 'Encode conventions',
        text: 'Paste this as your system prompt in Claude.ai. The rules (CSS modules, named exports, no hardcoded color) make every output consistent.',
      },
      {
        x: 70, y: 46,
        label: 'Write a brief',
        text: 'Name, props, and behavior. A brief produces far better code than a vague "make me a badge."',
      },
      {
        x: 40, y: 62,
        label: 'Generated component',
        text: 'Claude returns code that follows your conventions, because you stated them. Review it before accepting.',
      },
      {
        x: 50, y: 91,
        label: 'Iterate precisely',
        text: 'Next turn: "add an optional icon prop, change nothing else." Targeted edits beat rewriting from scratch.',
      },
    ],
  },
  keyIdeas: [
    'Brief first, code second: describe what a component renders, its props, and its interactions',
    'Design token systems mean Claude never hardcodes a color. The convention does the work.',
    'Review generated code before accepting it: Claude is fast but not infallible',
    '"Change X but keep Y" is often more effective than rewriting from scratch',
  ],
  compassExample: {
    label: 'Every component was brief-first',
    text: 'Every component in Composer\'s Compass was built by writing a brief first, then running Claude Code. The design token system means Claude never hardcodes a color because the convention is explicit. Named exports, one component per file, no inline styles: these rules exist because they make Claude\'s output consistent and reviewable across dozens of sessions.',
  },
  exercises: [
    {
      id: '05-a',
      title: 'Get Claude to generate a component from a brief',
      goal: 'Write a component brief and get Claude to generate the React JSX and CSS module for it.',
      context: 'A component brief specifies what it renders, what props it takes, what happens on interaction, and what conventions to follow. Claude produces much better code with a brief than from a vague description.',
      system: 'You are an expert React developer. You write clean, functional components using CSS modules. You always use named exports. You never use TypeScript. You never hardcode colors; they come from CSS custom properties.',
      starterText: '',
      examplePrompt: 'Write a React component called StatusBadge.\n\nProps:\n- status: string, one of "draft", "in-progress", "complete"\n- label: string, text to display\n\nBehavior: renders a small pill/badge with the label. Color depends on status: draft = gray, in-progress = amber, complete = green.\n\nConventions:\n- Named export\n- CSS module (StatusBadge.module.css)\n- Colors from CSS custom properties: --ts for gray, --amber for amber, --green for green\n- No TypeScript, no inline styles except dynamic class\n\nOutput: the JSX file and the CSS module, clearly separated.',
      reflection: 'Read the generated code. Does it follow every convention you listed? If one was violated, add a sentence to the brief making it explicit and run again. This is the normal iteration loop.',
    },
    {
      id: '05-b',
      title: 'Get Claude to iterate: change one thing, keep the rest',
      goal: 'Take the component from Exercise A and get Claude to modify one specific thing without breaking the rest.',
      context: '"Change X but keep Y" is a more precise instruction than rewriting the brief. It forces you to articulate what matters and what does not, and produces more targeted output.',
      system: 'You are an expert React developer. Apply only the specific changes requested. Do not refactor anything that was not mentioned.',
      starterText: 'Here\'s my StatusBadge component: [paste your component from Exercise A here]\n\nChange: add an optional icon prop (a string like "✓" or "•"). If provided, render it before the label. If not provided, the component looks identical to before.\n\nDo not change anything else.',
      examplePrompt: 'Here\'s my StatusBadge component:\n\n```jsx\nexport function StatusBadge({ status, label }) {\n  const cls = status === \'complete\' ? styles.complete\n    : status === \'in-progress\' ? styles.inProgress\n    : styles.draft;\n  return <span className={`${styles.badge} ${cls}`}>{label}</span>;\n}\n```\n\nChange: add an optional `icon` prop (a string, e.g. "✓"). If provided, render it before the label with a small gap. If not provided, the output is identical to before. Do not change the status logic, the CSS class names, or the export style.',
      reflection: 'Did Claude change anything outside the scope of the instruction? If it did, that\'s a signal to be more explicit. "Do not change X" in the prompt is a valid and common constraint.',
    },
  ],
};
