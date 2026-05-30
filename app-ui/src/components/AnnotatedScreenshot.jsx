import { useState } from 'react';
import styles from './AnnotatedScreenshot.module.css';

export function AnnotatedScreenshot({ src, alt = '', annotations = [], mockup = null }) {
  const [activePin, setActivePin] = useState(null);

  function handleFrameClick() {
    setActivePin(null);
  }

  function handlePinClick(e, i) {
    e.stopPropagation();
    setActivePin(prev => (prev === i ? null : i));
  }

  return (
    <div className={styles.frame} onClick={handleFrameClick}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} draggable={false} />
      ) : mockup ? (
        <ClaudeMockup mockup={mockup} />
      ) : null}

      {annotations.map((ann, i) => {
        const popLeft = ann.x > 58;
        const popUp = ann.y > 78;
        return (
          <div
            key={ann.id ?? i}
            className={styles.pinWrap}
            style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
          >
            <button
              className={[styles.pin, activePin === i ? styles.pinActive : ''].join(' ')}
              onClick={e => handlePinClick(e, i)}
              aria-label={ann.label}
            >
              {i + 1}
            </button>
            {activePin === i && (
              <div
                className={[
                  styles.popover,
                  popLeft ? styles.popoverLeft : styles.popoverRight,
                  popUp ? styles.popoverUp : styles.popoverDown,
                ].join(' ')}
              >
                <strong className={styles.popoverLabel}>{ann.label}</strong>
                <p className={styles.popoverText}>{ann.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ClaudeMockup({ mockup }) {
  const { model = 'Claude Sonnet', system, user, response = [] } = mockup;
  return (
    <div className={styles.mockup}>
      <div className={styles.topBar}>
        <div className={styles.modelChip}>{model}</div>
        <div className={styles.topIcons}>
          <div className={styles.iconStub} />
          <div className={styles.iconStub} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.systemBubble}>
          <span className={styles.systemTag}>System</span>
          <span className={styles.systemBody}>{system}</span>
        </div>

        <div className={styles.convo}>
          <div className={styles.userBubble}>{user}</div>

          <div className={styles.asstRow}>
            <div className={styles.asstAvatar}>C</div>
            <div className={styles.asstText}>
              {response.map((block, i) => <ResponseBlock key={i} block={block} />)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputStub}>Message Claude…</div>
        <div className={styles.sendStub}>↑</div>
      </div>
    </div>
  );
}

function ResponseBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <p className={styles.mockupText}>{block.text}</p>;
    case 'code':
      return (
        <div>
          {block.filename && <span className={styles.mockupCodeCaption}>{block.filename}</span>}
          <pre className={styles.mockupCode}>{block.code}</pre>
        </div>
      );
    case 'bullets':
      return (
        <ul className={styles.mockupBullets}>
          {block.items.map((item, i) => <li key={i} className={styles.mockupBullet}>{item}</li>)}
        </ul>
      );
    default:
      return null;
  }
}
