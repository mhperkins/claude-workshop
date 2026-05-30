export const lesson01 = {
  id: 1,
  slug: 'how-to-talk',
  title: 'How to Talk to Claude',
  technicalBar: 'None',
  concept: 'Claude is a context window, not a chatbot. It predicts the most useful next tokens given everything in its current context; it does not search the internet or remember past conversations. The skill is context curation, not question-asking.',
  illustration: {
    src: null,
    alt: 'Claude chat interface showing the system prompt, user message, and response that make up the context window',
    mockup: {
      model: 'Claude Sonnet',
      system: 'You are a helpful teacher explaining AI concepts to beginners.',
      user: 'Explain what a context window is in plain terms.',
      response: [
        {
          type: 'text',
          text: 'Think of the context window like a whiteboard. Everything I can see is written on it: your question, prior messages, any files you\'ve shared. When it fills up, older content falls off the edge.',
        },
      ],
    },
    annotations: [
      {
        x: 30, y: 7,
        label: 'Model selector',
        text: 'You can switch between Claude models here. Sonnet is the default — capable and fast for most tasks.',
      },
      {
        x: 50, y: 27,
        label: 'System prompt',
        text: 'Set by the app or API before the conversation starts. The user typically doesn\'t see this. It configures Claude\'s role, tone, and constraints.',
      },
      {
        x: 82, y: 47,
        label: 'Your message',
        text: 'The user turn. What you type — plus the system prompt above it — forms Claude\'s full context. Specificity here directly shapes the response.',
      },
      {
        x: 22, y: 67,
        label: 'Claude\'s response',
        text: 'The assistant turn. Claude predicts the most useful tokens given everything above: system prompt, your message, and any prior conversation.',
      },
      {
        x: 50, y: 91,
        label: 'Next prompt',
        text: 'Each new message appends to the context. Claude always sees the full history — not just the latest message. This is what "context window" means.',
      },
    ],
  },
  keyIdeas: [
    'A prompt is: system prompt + conversation history + any documents you paste in',
    'The context window is finite. What you include (and exclude) shapes the response.',
    'Claude hallucinates when it lacks context; more specific prompts produce more reliable output',
    'Claude Desktop, Claude Code, and the Anthropic API are three modes for the same model',
  ],
  compassExample: {
    label: 'Three modes in Composer\'s Compass',
    text: 'Maxwell uses Claude Desktop for composition analysis sessions (conversational, document-heavy), Claude Code inside VSCode for building the app (tool-integrated, file-aware), and the Anthropic API to power the app itself. Same model, three interaction modes, each suited to a different kind of work.',
  },
  exercises: [
    {
      id: '01-a',
      title: 'Ask Claude to explain itself',
      goal: 'Get Claude to explain what a context window is in plain terms, clear enough to explain to someone who has never used an AI tool.',
      context: 'Claude does not search the internet. It predicts the next useful tokens given everything in its context window. This is a fundamental concept students need to internalize before anything else makes sense.',
      system: 'You are a helpful teacher explaining AI concepts to beginners.',
      starterText: '',
      examplePrompt: 'Explain what a context window is to someone who has never used an AI tool before. Use a concrete analogy. Keep it under 150 words.',
      reflection: 'Did you specify a target audience and a length constraint? Run it again with those added and compare. Notice how constraints produce tighter, more useful output.',
    },
    {
      id: '01-b',
      title: 'Get Claude to improve a bad prompt',
      goal: 'Use Claude to critique and rewrite a vague prompt into a specific, well-constrained one.',
      context: 'Vague prompts produce vague output. The fix is almost always the same: add who you are, what you\'re making, what format you need, and how long it should be. Getting Claude to demonstrate this is itself a useful exercise.',
      system: 'You are an expert at writing effective prompts for AI tools.',
      starterText: 'Here\'s a vague prompt: "Tell me about music theory." Make it better.',
      examplePrompt: 'Here\'s a vague prompt: "Tell me about music theory." Rewrite it as a specific, well-constrained prompt for a composer writing a string quartet who needs to understand voice leading. Then explain each change you made and why it matters.',
      reflection: 'What three categories of information did Claude add to the rewritten prompt? Try applying those same categories to a prompt for your own work.',
    },
  ],
};
