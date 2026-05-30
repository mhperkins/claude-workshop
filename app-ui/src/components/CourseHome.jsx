import { lessons } from '../data/index.js';
import { countCompleted } from '../store/progressStore.js';
import styles from './CourseHome.module.css';

const BAR_LABELS = {
  'None': 'No coding needed',
  'Low': 'Low',
  'Medium': 'Medium',
  'Medium-High': 'Medium-High',
  'All of the above': 'Capstone',
};

export function CourseHome({ onSelectLesson }) {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Build Your Own Tools with AI</h1>
        <p className={styles.subtitle}>
          A 10-class workshop. Each class teaches one skill using real examples from an actual production project.
        </p>
      </header>
      <div className={styles.grid}>
        {lessons.map(lesson => {
          const done = countCompleted(lesson.exercises);
          const total = lesson.exercises.length;
          const complete = done === total;
          return (
            <button
              key={lesson.id}
              className={`${styles.card} ${complete ? styles.cardDone : ''}`}
              onClick={() => onSelectLesson(lesson.id)}
            >
              <div className={styles.cardTop}>
                <span className={styles.classNum}>Class {lesson.id}</span>
                <span className={`${styles.badge} ${complete ? styles.badgeDone : ''}`}>
                  {done}/{total}
                </span>
              </div>
              <h2 className={styles.cardTitle}>{lesson.title}</h2>
              <p className={styles.cardConcept}>{lesson.concept.slice(0, 120).trimEnd()}…</p>
              <div className={styles.cardFooter}>
                <span className={styles.bar}>
                  {BAR_LABELS[lesson.technicalBar] ?? lesson.technicalBar}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
