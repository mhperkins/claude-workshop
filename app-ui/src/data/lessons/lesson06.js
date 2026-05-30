export const lesson06 = {
  id: 6,
  slug: 'backend-api',
  title: 'Back-End and API Integration',
  technicalBar: 'Medium-High',
  concept: 'The API is the same model as the chat, but you control the context programmatically. You send a system prompt, a messages array, and configuration. You get text back. The callAgent pattern (one file handles all AI calls) is the architectural decision that keeps the rest of the app clean.',
  keyIdeas: [
    'The Anthropic SDK: messages array, system prompt, model selection, streaming',
    'callAgent() is a boundary: components call it, they never import the SDK directly',
    'Parsers convert model text output into structured data the app can use',
    'The API key must never reach the browser. It lives in a server-side proxy or Electron main process.',
  ],
  compassExample: {
    label: 'callAgent.js as the single boundary',
    text: 'In Composer\'s Compass, callAgent.js is the only file that talks to Claude. Every session type (intake, guide generation, constitution, score analysis) routes through it. Parsers in src/agent/parsers/ convert Claude\'s XML-tagged output into JavaScript objects. The app UI never imports the Anthropic SDK.',
  },
  exercises: [
    {
      id: '06-a',
      title: 'Get Claude to explain the callAgent pattern',
      goal: 'Ask Claude to explain why the callAgent pattern exists and what problem it solves, then ask it to sketch the implementation.',
      context: 'Understanding the WHY of an architectural pattern is more valuable than copying the code. Claude can explain architecture decisions clearly when you give it the specific pattern and ask for the reasoning.',
      system: 'You are a senior software architect explaining design patterns to an intermediate developer.',
      starterText: '',
      examplePrompt: 'Explain the "single agent gateway" pattern in web apps that use an AI API. Specifically:\n1. What problem does it solve? (Give a concrete example of what goes wrong without it.)\n2. What does the implementation look like? (Sketch a callAgent function in plain JavaScript: just the shape, no need to handle every edge case.)\n3. What are the two things that must never happen, and why?\n\nKeep it under 300 words.',
      reflection: 'What were the two "must never happen" rules Claude identified? Compare them to the rules in this app\'s callAgent.js. Did Claude find the same ones?',
    },
    {
      id: '06-b',
      title: 'Get Claude to write a parser',
      goal: 'Describe a specific XML-tagged output format and get Claude to write a JavaScript parser for it.',
      context: 'Parsers are how structured data crosses the boundary between Claude\'s text output and your app\'s state. Writing a parser is a well-defined task: it has a clear input format and a clear output shape. Claude produces good parsers when you specify both precisely.',
      system: 'You are an expert JavaScript developer. You write clean, defensive parsers. You use regex and string methods, not eval or JSON.parse on untrusted input.',
      starterText: '',
      examplePrompt: 'Write a JavaScript parser for this Claude output format:\n\n```\n<exercise>\n  <title>Exercise title here</title>\n  <goal>What the student should produce</goal>\n  <reflection>One reflection question</reflection>\n</exercise>\n```\n\nThe parser should:\n- Accept a string (Claude\'s full response)\n- Extract the content inside each tag\n- Return an object: { title, goal, reflection }\n- Return null if any required tag is missing\n- Handle extra whitespace inside tags gracefully\n\nOutput: just the function, no wrapper code.',
      reflection: 'Test the parser mentally: what happens if Claude includes extra text before the <exercise> tag? Does the parser handle it? Ask Claude to add that case if it does not.',
    },
  ],
};
