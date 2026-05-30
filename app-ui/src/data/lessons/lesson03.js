export const lesson03 = {
  id: 3,
  slug: 'markdown',
  title: 'Markdown and Structured Writing',
  technicalBar: 'Low',
  concept: 'Markdown is the native language of Claude. Using structured sections, headers, and XML tags as "slots" makes Claude\'s output predictable and parseable. Templates are tools: write them once, fill them forever.',
  keyIdeas: [
    'Claude reads and writes markdown reliably because it\'s saturated in the training data',
    'Structured sections act as slots Claude fills in consistently',
    'XML tags mark output format boundaries Claude respects: <title>, <summary>, <steps>',
    'Markdown files work as data: templates, intake forms, system prompts',
  ],
  compassExample: {
    label: 'Every artifact is a markdown template',
    text: 'Guides, constitutions, the system prompt, intake templates, CLAUDE.md files, and analysis rules are all markdown. The intake form is a template Claude fills out during conversation. The constitution is a markdown doc Claude drafts and saves via an MCP tool call. Markdown is used instead of JSON at this layer because it\'s human-readable and Claude-native.',
  },
  exercises: [
    {
      id: '03-a',
      title: 'Get Claude to fill a template',
      goal: 'Write a markdown template with placeholder sections and get Claude to fill it in for a specific subject.',
      context: 'A template with clear section headers and placeholder text gives Claude explicit slots to fill. This produces consistent, structured output you can reuse across many subjects.',
      system: 'You are a helpful assistant that fills in document templates precisely.',
      starterText: '',
      examplePrompt: `Fill in this template for a beginner's guide to a software tool. The tool is "Git" — version control for code.\n\n---\n# [Tool Name] — Quick Start\n\n## What it does\n[One sentence describing the core purpose]\n\n## When to use it\n[2-3 bullet points: specific situations where this tool is the right choice]\n\n## The three commands you need first\n[Numbered list: command + one-line description of what it does]\n\n## Common mistake to avoid\n[One paragraph describing the most common beginner error and how to avoid it]\n---`,
      reflection: 'Notice how the template header names shaped what Claude wrote in each section. Try changing one header to something vaguer (e.g., "Notes" instead of "Common mistake to avoid") and see if the output is still useful.',
    },
    {
      id: '03-b',
      title: 'Get structured output with XML tags',
      goal: 'Ask Claude to produce structured output using XML tags so each piece of information can be extracted separately.',
      context: 'When you build apps with Claude, you need its output in a parseable format. XML tags are a reliable way to mark section boundaries. Claude respects them consistently when you model the format in your prompt.',
      system: 'You are a helpful assistant. When asked to produce structured output, use the exact XML tags specified.',
      starterText: '',
      examplePrompt: 'Analyze the word "counterpoint" as a music theory concept. Produce your response in this exact structure:\n\n<definition>One sentence definition, jargon-free</definition>\n<origin>Where the term comes from, in one sentence</origin>\n<example>A concrete musical example (specific piece or technique), 2 sentences</example>\n<common_confusion>One thing beginners get wrong about this concept</common_confusion>',
      reflection: 'Copy one of the XML tags and its content from the output. Could you parse that out of a longer response automatically? This is the technique apps like Composer\'s Compass use to extract structured data from Claude\'s responses.',
    },
  ],
};
