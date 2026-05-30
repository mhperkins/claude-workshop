import { useState } from 'react';
import { ApiKeyGate } from './ApiKeyGate.jsx';
import { CourseHome } from './CourseHome.jsx';
import { LessonView } from './LessonView.jsx';
import { ClaudeMdGenerator } from './ClaudeMdGenerator.jsx';
import styles from './App.module.css';

export function App() {
  const [view, setView] = useState({ type: 'home' });

  return (
    <ApiKeyGate>
      <div className={styles.app}>
        {view.type === 'home' && (
          <CourseHome
            onSelectLesson={id => setView({ type: 'lesson', id })}
            onOpenGenerator={() => setView({ type: 'generator' })}
          />
        )}
        {view.type === 'lesson' && (
          <LessonView
            lessonId={view.id}
            onBack={() => setView({ type: 'home' })}
          />
        )}
        {view.type === 'generator' && (
          <ClaudeMdGenerator onBack={() => setView({ type: 'home' })} />
        )}
      </div>
    </ApiKeyGate>
  );
}
