export const lesson01 = {
  id: 1,
  slug: 'how-to-talk',
  title: 'How to Talk to Claude',
  technicalBar: 'None',
  concept: 'Claude is a context window, not a chatbot. It predicts the most useful next tokens given everything in its current context; it does not search the internet or remember past conversations. The skill is context curation, not question-asking.',
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
