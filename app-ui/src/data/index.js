import { lesson01 } from './lessons/lesson01.js';
import { lesson02 } from './lessons/lesson02.js';
import { lesson03 } from './lessons/lesson03.js';
import { lesson04 } from './lessons/lesson04.js';
import { lesson05 } from './lessons/lesson05.js';
import { lesson06 } from './lessons/lesson06.js';
import { lesson07 } from './lessons/lesson07.js';
import { lesson08 } from './lessons/lesson08.js';
import { lesson09 } from './lessons/lesson09.js';
import { lesson10 } from './lessons/lesson10.js';

export const lessons = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
];

export function getLessonById(id) {
  return lessons.find(l => l.id === id) ?? null;
}
