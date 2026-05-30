import { useState } from 'react';
import styles from './ApiKeyGate.module.css';

export function ApiKeyGate({ children }) {
  const [started, setStarted] = useState(() => !!localStorage.getItem('workshop:started'));

  if (started) return <>{children}</>;

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <h1 className={styles.title}>Claude Workshop</h1>
        <p className={styles.subtitle}>Build Your Own Tools with AI</p>
        <p className={styles.body}>
          A 10-class workshop where you build real tools with Claude. Each class teaches one skill
          using real examples from an actual production project.
        </p>
        <button
          className={styles.btn}
          onClick={() => {
            localStorage.setItem('workshop:started', '1');
            setStarted(true);
          }}
        >
          Start the course
        </button>
      </div>
    </div>
  );
}
