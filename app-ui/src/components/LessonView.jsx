import { useEffect, useState } from 'react';
import { getLessonById } from '../data/index.js';
import { isComplete, countCompleted } from '../store/progressStore.js';
import { ExerciseRunner } from './ExerciseRunner.jsx';
import { AnnotatedScreenshot } from './AnnotatedScreenshot.jsx';
import styles from './LessonView.module.css';

export function LessonView({ lessonId, onBack }) {
  const lesson = getLessonById(lessonId);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [tick, setTick] = useState(0);
  const [promptCache, setPromptCache] = useState({});

  if (!lesson) return null;

  const allDone = countCompleted(lesson.exercises) === lesson.exercises.length;
  // slides: 0 = intro, 1..N = exercises, N+1 = completion
  const total = 1 + lesson.exercises.length + 1;

  function goTo(index) {
    setDirection(index > slideIndex ? 'forward' : 'back');
    setSlideIndex(index);
  }

  function handleComplete() {
    setTick(n => n + 1);
    if (countCompleted(lesson.exercises) === lesson.exercises.length) {
      setTimeout(() => goTo(total - 1), 400);
    }
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'Escape') onBack();
      if (e.key === 'ArrowLeft' && slideIndex > 0) goTo(slideIndex - 1);
      if (e.key === 'ArrowRight' && slideIndex < total - 1) goTo(slideIndex + 1);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slideIndex, total, onBack]);

  const isIntro = slideIndex === 0;
  const isCompletion = slideIndex === total - 1;
  const exercise = (!isIntro && !isCompletion) ? lesson.exercises[slideIndex - 1] : null;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.back} onClick={onBack}>← All classes</button>

        <div className={styles.dots}>
          {Array.from({ length: total }, (_, i) => {
            const isCompl = i === total - 1;
            return (
              <button
                key={i}
                className={[
                  styles.dot,
                  i === slideIndex ? styles.dotActive : '',
                  i > 0 && !isCompl && isComplete(lesson.exercises[i - 1].id) ? styles.dotDone : '',
                  isCompl && allDone ? styles.dotDone : '',
                ].join(' ')}
                onClick={() => goTo(i)}
                aria-label={i === 0 ? 'Lesson intro' : isCompl ? 'Completion' : `Exercise ${i}`}
              />
            );
          })}
        </div>

        <div className={styles.slideLabel}>
          {isIntro && `Class ${lesson.id}`}
          {!isIntro && !isCompletion && `Exercise ${slideIndex} of ${total - 2}`}
          {isCompletion && 'Complete'}
        </div>
      </div>

      <div className={styles.slideArea}>
        <button
          className={[styles.arrowBtn, styles.arrowLeft].join(' ')}
          disabled={slideIndex === 0}
          onClick={() => goTo(slideIndex - 1)}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className={styles.track}>
        <div
          key={slideIndex}
          className={[styles.slide, direction === 'forward' ? styles.slideForward : styles.slideBack].join(' ')}
        >
          {isIntro && (
            <div className={styles.introCard}>
              <div className={styles.classTag}>Class {lesson.id}</div>
              <h1 className={styles.title}>{lesson.title}</h1>
              <p className={styles.concept}>{lesson.concept}</p>

              {lesson.illustration !== undefined && (
                <div className={styles.illustrationWrap}>
                  <AnnotatedScreenshot
                    src={lesson.illustration?.src ?? null}
                    alt={lesson.illustration?.alt ?? ''}
                    annotations={lesson.illustration?.annotations ?? []}
                    mockup={lesson.illustration?.mockup ?? null}
                  />
                  {(lesson.illustration?.annotations ?? []).length > 0 && (
                    <p className={styles.illustrationHint}>Click the numbered pins to learn about each part.</p>
                  )}
                </div>
              )}

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

              <button className={styles.startBtn} onClick={() => goTo(1)}>
                Start exercises
              </button>
            </div>
          )}

          {exercise && (
            <ExerciseRunner
              key={exercise.id}
              exercise={exercise}
              initialPrompt={promptCache[exercise.id] ?? exercise.starterText ?? ''}
              onPromptChange={val => setPromptCache(prev => ({ ...prev, [exercise.id]: val }))}
              onComplete={handleComplete}
            />
          )}

          {isCompletion && (
            <div className={styles.completionCard}>
              {allDone ? (
                <>
                  <div className={styles.completionIcon}>✓</div>
                  <h2 className={styles.completionTitle}>Class {lesson.id} complete</h2>
                  <p className={styles.completionSub}>{lesson.title}</p>
                  <p className={styles.completionBody}>
                    You finished all {lesson.exercises.length} exercise{lesson.exercises.length !== 1 ? 's' : ''}.
                    Head back to pick up the next class.
                  </p>
                  <button className={styles.completionBtn} onClick={onBack}>
                    Back to all classes
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.completionLocked}>
                    {countCompleted(lesson.exercises)}/{lesson.exercises.length} exercises done
                  </div>
                  <p className={styles.completionBody}>
                    Finish all exercises to complete this class.
                  </p>
                  <button className={styles.completionBtn} onClick={() => goTo(1)}>
                    Go to exercises
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        </div>

        <button
          className={[styles.arrowBtn, styles.arrowRight].join(' ')}
          disabled={slideIndex === total - 1}
          onClick={() => goTo(slideIndex + 1)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}
