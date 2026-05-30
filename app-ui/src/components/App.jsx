import { useState } from 'react';
import { ApiKeyGate } from './ApiKeyGate.jsx';
import { CourseHome } from './CourseHome.jsx';
import { LessonView } from './LessonView.jsx';
import styles from './App.module.css';

export function App() {
  const [activeLessonId, setActiveLessonId] = useState(null);

  return (
    <ApiKeyGate>
      <div className={styles.app}>
        {activeLessonId === null ? (
          <CourseHome onSelectLesson={setActiveLessonId} />
        ) : (
          <LessonView
            lessonId={activeLessonId}
            onBack={() => setActiveLessonId(null)}
          />
        )}
      </div>
    </ApiKeyGate>
  );
}
