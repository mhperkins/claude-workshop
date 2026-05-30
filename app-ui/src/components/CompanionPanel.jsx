import { useState } from 'react';
import styles from './CompanionPanel.module.css';

export function CompanionPanel({ exercise, onMarkComplete, onDismiss, done }) {
  const [copiedSystem, setCopiedSystem] = useState(false);
  const [copiedStarter, setCopiedStarter] = useState(false);
  const [minimized, setMinimized] = useState(false);

  function copyText(text, setCopied) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className={[styles.panel, minimized ? styles.panelMin : ''].join(' ')}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>Claude.ai companion</span>
        <div className={styles.headerBtns}>
          <button
            className={styles.iconBtn}
            onClick={() => setMinimized(v => !v)}
            title={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? '▲' : '▼'}
          </button>
          <button className={styles.iconBtn} onClick={onDismiss} title="Close">×</button>
        </div>
      </div>

      {!minimized && (
        <div className={styles.body}>
          <div className={styles.goal}>{exercise.goal}</div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>System prompt to paste</span>
            <p className={styles.systemText}>{exercise.system}</p>
            <button
              className={styles.copyBtn}
              onClick={() => copyText(exercise.system, setCopiedSystem)}
            >
              {copiedSystem ? 'Copied!' : 'Copy system prompt'}
            </button>
          </div>

          {exercise.starterText && (
            <div className={styles.section}>
              <span className={styles.sectionLabel}>Starter text</span>
              <p className={styles.systemText}>{exercise.starterText}</p>
              <button
                className={styles.copyBtn}
                onClick={() => copyText(exercise.starterText, setCopiedStarter)}
              >
                {copiedStarter ? 'Copied!' : 'Copy starter text'}
              </button>
            </div>
          )}

          <div className={styles.hint}>
            <span className={styles.hintLabel}>Goal</span>
            <p className={styles.hintText}>{exercise.context}</p>
          </div>

          {done ? (
            <p className={styles.doneMsg}>Exercise complete</p>
          ) : (
            <button className={styles.doneBtn} onClick={onMarkComplete}>
              Mark complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
