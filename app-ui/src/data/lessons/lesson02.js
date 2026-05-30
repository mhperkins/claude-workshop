export const lesson02 = {
  id: 2,
  slug: 'brainstorming',
  title: 'Brainstorming and Design Thinking',
  technicalBar: 'None',
  concept: 'Claude\'s best use as a thinking partner is when you give it constraints, not when you ask open questions. "Give me ideas" produces noise. "Here are my constraints: what would you do?" produces signal.',
  keyIdeas: [
    'Constraints make brainstorming useful: budget, audience, tech stack, deadline',
    'Use Claude to stress-test decisions before you build them',
    'Iterate through conversation, not one-shot prompts',
    'Know when to stop brainstorming and commit',
  ],
  compassExample: {
    label: 'Designing the canvas model through conversation',
    text: 'The infinite canvas, the compile+execute model, and the node types in Composer\'s Compass were all designed through conversation before a single line of code was written. Wireframe HTML files (layout-a through layout-d) and brainstorm docs are the artifacts from those sessions.',
  },
  exercises: [
    {
      id: '02-a',
      title: 'Constrained ideation',
      goal: 'Get Claude to generate concrete ideas for a tool you\'d like to build, given explicit constraints you define.',
      context: 'Open-ended "give me ideas" prompts produce generic output. Constraints like budget, platform, audience, and timeline force Claude into a specific solution space and produce actionable ideas.',
      system: 'You are a product design consultant helping someone plan a software tool.',
      starterText: '',
      examplePrompt: 'I want to build a tool that helps independent musicians track their practice sessions. Constraints: it must work offline, have no account/login, take under 30 seconds to log a session, and run in a browser. Generate 5 concrete feature ideas within these constraints. For each, describe what the user does and what the tool stores.',
      reflection: 'How did specifying constraints change what Claude produced? Try removing one constraint and running again: does the output get broader or more useful?',
    },
    {
      id: '02-b',
      title: 'Stress-test a decision',
      goal: 'Describe a design decision you\'ve made (or are considering) and get Claude to argue against it.',
      context: 'Claude can play devil\'s advocate when you explicitly ask it to. This is more valuable than asking "is this a good idea?" which only produces agreement. Asking Claude to find problems forces it to surface risks.',
      system: 'You are a skeptical technical reviewer. Find real problems with the decisions presented to you. Do not be polite about it.',
      starterText: 'I\'ve decided to store all my app\'s data in localStorage instead of a database. What could go wrong?',
      examplePrompt: 'I\'ve decided to store all user data for a web app in localStorage. The app is a solo tool: single user, no sharing, no sync. Argue against this decision. What specific failure modes should I plan for? Which of them would actually matter for a single-user offline tool?',
      reflection: 'Did you tell Claude the specific use case (single user, offline)? Without that context, the critique would be generic. How does adding scope change the quality of the pushback?',
    },
  ],
};
