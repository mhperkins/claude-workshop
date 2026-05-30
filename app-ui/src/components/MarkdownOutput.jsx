import styles from './MarkdownOutput.module.css';

function parseInline(text) {
  const parts = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith('**')) parts.push(<strong key={m.index}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith('*')) parts.push(<em key={m.index}>{token.slice(1, -1)}</em>);
    else parts.push(<code key={m.index} className={styles.inlineCode}>{token.slice(1, -1)}</code>);
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function MarkdownOutput({ text }) {
  const blocks = [];
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(
        <pre key={i} className={styles.codeBlock}>
          {lang && <span className={styles.lang}>{lang}</span>}
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++;
      continue;
    }

    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);
    if (h3) { blocks.push(<h3 key={i} className={styles.h3}>{parseInline(h3[1])}</h3>); i++; continue; }
    if (h2) { blocks.push(<h2 key={i} className={styles.h2}>{parseInline(h2[1])}</h2>); i++; continue; }
    if (h1) { blocks.push(<h1 key={i} className={styles.h1}>{parseInline(h1[1])}</h1>); i++; continue; }

    if (line.match(/^[-*] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(<li key={i}>{parseInline(lines[i].slice(2))}</li>);
        i++;
      }
      blocks.push(<ul key={`ul-${i}`} className={styles.ul}>{items}</ul>);
      continue;
    }

    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(<li key={i}>{parseInline(lines[i].replace(/^\d+\. /, ''))}</li>);
        i++;
      }
      blocks.push(<ol key={`ol-${i}`} className={styles.ol}>{items}</ol>);
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    blocks.push(<p key={i} className={styles.p}>{parseInline(line)}</p>);
    i++;
  }

  return <div className={styles.md}>{blocks}</div>;
}
