import { useState } from 'react';
import styles from './ApiKeyGate.module.css';

export function ApiKeyGate({ children }) {
  const [key, setKey] = useState(() => localStorage.getItem('workshop:api-key') ?? '');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  if (key) {
    return (
      <>
        {children}
        <button
          className={styles.changeKey}
          onClick={() => {
            localStorage.removeItem('workshop:api-key');
            setKey('');
            setInput('');
          }}
        >
          Change API key
        </button>
      </>
    );
  }

  function handleSave() {
    const trimmed = input.trim();
    if (!trimmed.startsWith('sk-ant-')) {
      setError('Key should start with sk-ant-. Check the Anthropic console.');
      return;
    }
    localStorage.setItem('workshop:api-key', trimmed);
    setKey(trimmed);
    setError('');
  }

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <h1 className={styles.title}>Claude Workshop</h1>
        <p className={styles.subtitle}>Build Your Own Tools with AI</p>
        <p className={styles.body}>
          Exercises in this course call Claude directly from your browser using your own Anthropic API key.
          Your key is stored in this browser only and never sent anywhere except Anthropic.
        </p>
        <label className={styles.label} htmlFor="apikey">
          Anthropic API key
        </label>
        <input
          id="apikey"
          type="password"
          className={styles.input}
          placeholder="sk-ant-..."
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.btn} onClick={handleSave}>
          Start the course
        </button>
        <p className={styles.hint}>
          Get a key at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a>. API usage is billed to your account.
        </p>
      </div>
    </div>
  );
}
