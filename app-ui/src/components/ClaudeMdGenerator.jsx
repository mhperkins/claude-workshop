import { useRef, useState } from 'react';
import { callAgent } from '../agent/callAgent.js';
import { MarkdownOutput } from './MarkdownOutput.jsx';
import styles from './ClaudeMdGenerator.module.css';

const QUESTIONS = [
  { key: 'projectName', label: 'What is the project called?' },
  { key: 'what', label: 'In 1-2 sentences, what does it do?' },
  { key: 'tech', label: 'What language, framework, and main dependencies does it use?' },
  { key: 'runCmd', label: 'How do you start it in development? (e.g. npm run dev, python main.py)' },
  { key: 'structure', label: 'Describe the key folders or files and what they contain.' },
  { key: 'conventions', label: 'Any coding conventions or rules Claude should follow? (optional)' },
  { key: 'context', label: 'Anything else Claude needs to know? Background, constraints, quirks. (optional)' },
];

const SYSTEM = `You are a senior software engineer. The user will give you details about their project. Generate a clean, well-structured CLAUDE.md file for it.

A CLAUDE.md tells Claude Code what the project is, how to run it, key file locations, and any conventions to follow.

Format:
- Start with a one-sentence project description under a "## What This Is" heading
- Include "## Run It" with the dev command
- Include "## Architecture" with a small table (Layer | Detail)
- Include "## File Map" with a simple tree of the key paths
- Include "## Coding Conventions" if any were provided
- Include "## Key Context" if extra context was provided
- Keep each section tight — this is a reference, not documentation

Output only the CLAUDE.md content, starting with the # heading. No preamble.`;

export function ClaudeMdGenerator({ onBack }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);
  const outputRef = useRef(null);

  function handleChange(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    const required = QUESTIONS.slice(0, 5);
    for (const q of required) {
      if (!answers[q.key]?.trim()) {
        setError(`Please answer: "${q.label}"`);
        return;
      }
    }
    setError('');

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setOutput('');
    setSubmitted(true);

    const userMessage = QUESTIONS
      .filter(q => answers[q.key]?.trim())
      .map(q => `${q.label}\n${answers[q.key].trim()}`)
      .join('\n\n');

    try {
      await callAgent({
        system: SYSTEM,
        messages: [{ role: 'user', content: userMessage }],
        onChunk: (text) => {
          setOutput(prev => {
            const next = prev + text;
            setTimeout(() => {
              outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
            }, 0);
            return next;
          });
        },
        signal: ctrl.signal,
      });
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.back} onClick={onBack}>← All classes</button>
        <span className={styles.label}>CLAUDE.md Generator</span>
        <span />
      </div>

      <div className={styles.body}>
        <div className={styles.form}>
          <h1 className={styles.title}>Generate a CLAUDE.md</h1>
          <p className={styles.intro}>
            Answer these questions about your project and Claude will write a CLAUDE.md file you can drop
            into your repo. This is the pattern taught in Class 4.
          </p>

          {QUESTIONS.map((q, i) => (
            <div key={q.key} className={styles.field}>
              <label className={styles.fieldLabel} htmlFor={q.key}>
                {i + 1}. {q.label}
              </label>
              <textarea
                id={q.key}
                className={styles.textarea}
                rows={q.key === 'structure' || q.key === 'context' ? 4 : 2}
                value={answers[q.key] ?? ''}
                onChange={e => handleChange(q.key, e.target.value)}
                placeholder={i >= 5 ? 'Optional' : ''}
              />
            </div>
          ))}

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.generateBtn} onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating…' : submitted ? 'Regenerate' : 'Generate CLAUDE.md'}
          </button>
        </div>

        {submitted && (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <span className={styles.resultLabel}>Your CLAUDE.md</span>
              {output && !loading && (
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className={styles.output} ref={outputRef}>
              <MarkdownOutput text={output} />
              {loading && <span className={styles.cursor}>▌</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
