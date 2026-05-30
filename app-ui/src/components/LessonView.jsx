import { useState } from 'react';
import { getLessonById } from '../data/index.js';
import { ExerciseRunner } from './ExerciseRunner.jsx';
import styles from './LessonView.module.css';

export function LessonView({ lessonId, onBack }) {
  const lesson = getLessonById(lessonId);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [, forceUpdate] = useState(0);

  if (!lesson) return null;

  const exercise = lesson.exercises[exerciseIndex];
  const total = lesson.exercises.length;

  function handleComplete() {
    forceUpdate(n => n + 1);
  }

  return (
    <div className={styles.view}>
      <div className={styles.content}>
        <button className={styles.back} onClick={onBack}>← All classes</button>

        <div className={styles.classTag}>Class {lesson.id}</div>
        <h1 className={styles.title}>{lesson.title}</h1>
        <p className={styles.concept}>{lesson.concept}</p>

        <div className={styles.section}>
          <h2 className={styles.sectionHead}>Key ideas</h2>
          <ul className={styles.ideas}>
            {lesson.keyIdeas.map((idea, i) => (
              <li key={i} className={styles.idea}>{idea}</li>
            ))}
          </ul>
        </div>

        <div className={styles.example}>
          <div className={styles.exampleLabel}>From Composer's Compass</div>
          <p className={styles.exampleTitle}>{lesson.compassExample.label}</p>
          <p className={styles.exampleText}>{lesson.compassExample.text}</p>
        </div>
      </div>

      <div className={styles.exercises}>
        <div className={styles.exerciseHeader}>
          <span className={styles.exerciseNav}>
            Exercise {exerciseIndex + 1} of {total}
          </span>
          <div className={styles.stepBtns}>
            <button
              className={styles.stepBtn}
              disabled={exerciseIndex === 0}
              onClick={() => setExerciseIndex(i => i - 1)}
            >
              Prev
            </button>
            <button
              className={styles.stepBtn}
              disabled={exerciseIndex === total - 1}
              onClick={() => setExerciseIndex(i => i + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <ExerciseRunner
          key={exercise.id}
          exercise={exercise}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
