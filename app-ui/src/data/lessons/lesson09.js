export const lesson09 = {
  id: 9,
  slug: 'troubleshooting',
  title: 'Troubleshooting and Bug Fixing',
  technicalBar: 'Medium',
  concept: 'Claude fixes bugs faster when you give it the right information. The skill is knowing what to include: error message, file path, what you expected, what actually happened. A good bug report is half the solution.',
  keyIdeas: [
    'Paste the full error: not just the last line, not a paraphrase',
    'Include: what you expected, what happened, file path, relevant code',
    'Ask for root cause, not just a fix. "Why did this happen?" is the useful question.',
    'The verify loop: make a change, run the app, confirm it actually works',
  ],
  compassExample: {
    label: 'The /verify skill and the development protocol',
    text: 'Composer\'s Compass has a /verify skill that runs the app and observes behavior rather than just checking that the code compiles. The development protocol requires live-testing the golden path before marking a phase complete. When Claude proposes a fix, you check the actual change before reporting it done.',
  },
  exercises: [
    {
      id: '09-a',
      title: 'Get Claude to diagnose a bug from a complete report',
      goal: 'Write a complete bug report (error, file, expected, actual) and get Claude to diagnose the root cause and propose a fix.',
      context: 'A complete bug report includes: the exact error message, the file and line, what you expected, what happened, and any relevant code. This is enough for Claude to diagnose most bugs without asking follow-up questions.',
      system: 'You are a senior developer debugging code. You identify root causes, not just symptoms. You explain why the bug occurs before proposing a fix.',
      starterText: '',
      examplePrompt: 'Bug report:\n\nError: "Cannot read properties of undefined (reading \'map\')"\nFile: src/components/PieceList.jsx, line 12\nExpected: A list of pieces renders on page load\nActual: The page crashes immediately with the error above\n\nCode at line 12:\n```jsx\nconst items = pieces.map(p => <PieceCard key={p.id} piece={p} />);\n```\n\nContext: `pieces` comes from a prop passed by the parent. The parent fetches pieces from localStorage using loadPieces(), which returns an array.\n\nDiagnose the root cause. What is undefined, why is it undefined, and what is the fix? Also: what defensive pattern would prevent this class of error in the future?',
      reflection: 'Did Claude identify that `pieces` could be undefined on initial render before the data loads? The fix is a default value. The defensive pattern is what prevents it from happening again. Which is more valuable?',
    },
    {
      id: '09-b',
      title: 'Get Claude to compare a good vs. bad bug report',
      goal: 'Show Claude two bug reports for the same problem and get it to explain why one is more useful than the other.',
      context: 'Most developers submit bad bug reports because they do not know what information Claude needs. Getting Claude to contrast a good and bad report for the exact same bug teaches the pattern more clearly than a rule list.',
      system: 'You are a senior developer who reviews bug reports and coaches junior developers on how to write them effectively.',
      starterText: '',
      examplePrompt: 'Compare these two bug reports for the same problem:\n\nReport A: "My app is broken. The list doesn\'t show up."\n\nReport B: "Error: Cannot read properties of undefined (reading \'map\'). File: src/components/PieceList.jsx, line 12. Expected: a list of pieces renders on load. Actual: white screen with the error above in console. The pieces prop comes from the parent component which calls loadPieces() on mount. Code: `const items = pieces.map(p => <PieceCard key={p.id} piece={p} />);`"\n\nFor each report, describe: what Claude can diagnose from it, what follow-up questions would be needed, and approximately how many back-and-forth exchanges it would take to reach a fix. Then list the three most important pieces of information Report B included that Report A omitted.',
      reflection: 'What\'s the cost of a bad bug report in terms of time? If each follow-up exchange takes 2 minutes, and Report A needs 4 exchanges while Report B needs 0, that\'s 8 minutes per bug. Across 10 bugs a week, that\'s over an hour. Is the upfront investment in a complete bug report worth it?',
    },
  ],
};
