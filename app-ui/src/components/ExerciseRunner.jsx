import { useRef, useState } from 'react';
import { callAgent } from '../agent/callAgent.js';
import { markComplete, isComplete } from '../store/progressStore.js';
import { MarkdownOutput } from './MarkdownOutput.jsx';
import { CompanionPanel } from './CompanionPanel.jsx';
import styles from './ExerciseRunner.module.css';

export function ExerciseRunner({ exercise, initialPrompt, onPromptChange, onComplete }) {
  const [prompt, setPrompt] = useState(initialPrompt ?? exercise.starterText ?? '');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [done, setDone] = useState(() => isComplete(exercise.id));
  const [companionOpen, setCompanionOpen] = useState(false);
  const abortRef = useRef(null);
  const outputRef = useRef(null);

  async function handleRun() {
    if (!prompt.trim()) {
      setError('Write a prompt first.');
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setOutput('');
    setError('');

    try {
      await callAgent({
        system: exercise.system,
        messages: [{ role: 'user', content: prompt }],
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
      setHasRun(true);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleMarkDone() {
    markComplete(exercise.id);
    setDone(true);
    onComplete?.();
  }

  function openInClaude() {
    window.open('https://claude.ai', '_blank', 'noopener');
    setCompanionOpen(true);
  }

  return (
    <div className={styles.runner}>
      <div className={styles.meta}>
        <h3 className={styles.exTitle}>{exercise.title}</h3>
        <div className={styles.goal}>{exercise.goal}</div>
      </div>

      <div className={styles.context}>
        <span className={styles.contextLabel}>Context</span>
        <p className={styles.contextText}>{exercise.context}</p>
      </div>

      <div className={styles.blueprint}>
        <div className={styles.blueprintSystem}>
          <div className={styles.blueprintHeader}>
            <span className={styles.blueprintTag}>Pre-set</span>
            <span className={styles.blueprintLabel}>Claude's role</span>
          </div>
          <p className={styles.blueprintText}>{exercise.system}</p>
        </div>
        <div className={styles.blueprintArrow}>↓</div>
        <div className={styles.blueprintUser}>
          <div className={styles.blueprintHeader}>
            <span className={styles.blueprintTagUser}>You write</span>
            <span className={styles.blueprintLabel}>Your prompt</span>
          </div>
          <p className={styles.blueprintPlaceholder}>What you type below becomes the user turn in the context window.</p>
        </div>
      </div>

      <div className={styles.promptSection}>
        <label className={styles.promptLabel} htmlFor={`prompt-${exercise.id}`}>
          Your prompt
        </label>
        <textarea
          id={`prompt-${exercise.id}`}
          className={styles.textarea}
          value={prompt}
          onChange={e => { setPrompt(e.target.value); onPromptChange?.(e.target.value); }}
          placeholder="Write a prompt that gets Claude to accomplish the goal above…"
          rows={6}
          disabled={loading}
        />
        <div className={styles.actions}>
          <button className={styles.runBtn} onClick={handleRun} disabled={loading}>
            {loading ? 'Running…' : 'Run'}
          </button>
          {loading && (
            <button
              className={styles.stopBtn}
              onClick={() => { abortRef.current?.abort(); setLoading(false); }}
            >
              Stop
            </button>
          )}
          <button className={styles.claudeBtn} onClick={openInClaude} title="Open Claude.ai with a companion panel">
            Try in Claude.ai ↗
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {(output || loading) && (
        <div className={styles.outputSection}>
          <span className={styles.outputLabel}>Claude's response</span>
          <div className={styles.output} ref={outputRef}>
            <MarkdownOutput text={output} />
            {loading && <span className={styles.cursor}>▌</span>}
          </div>
        </div>
      )}

      {hasRun && (
        <div className={styles.reflection}>
          <span className={styles.reflectionLabel}>Reflect</span>
          <p className={styles.reflectionText}>{exercise.reflection}</p>
        </div>
      )}

      {hasRun && (
        <div className={styles.exampleSection}>
          <button className={styles.exampleToggle} onClick={() => setShowExample(v => !v)}>
            {showExample ? 'Hide example prompt' : 'Show example prompt'}
          </button>
          {showExample && (
            <pre className={styles.examplePrompt}>{exercise.examplePrompt}</pre>
          )}
        </div>
      )}

      {hasRun && !done && (
        <button className={styles.doneBtn} onClick={handleMarkDone}>
          Mark complete
        </button>
      )}
      {done && <p className={styles.doneMsg}>Exercise complete</p>}

      {companionOpen && (
        <CompanionPanel
          exercise={exercise}
          done={done}
          onMarkComplete={handleMarkDone}
          onDismiss={() => setCompanionOpen(false)}
        />
      )}
    </div>
  );
}
