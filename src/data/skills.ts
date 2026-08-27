import type { SkillGroup } from '../types';

// Groupings follow the CV so the two match. `tech` points at data/tech.ts
// for the logo, and is left off for anything without one.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', tech: 'JavaScript' },
      { name: 'Python', tech: 'Python' },
      { name: 'HTML5', tech: 'HTML' },
      { name: 'CSS3', tech: 'CSS' },
      { name: 'TypeScript', tech: 'TypeScript', status: 'learning' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', tech: 'React' },
      { name: 'Hooks, routing and state' },
      { name: 'Form validation' },
      { name: 'Bootstrap', tech: 'Bootstrap' },
      { name: 'Responsive and accessible design' },
      { name: 'Tailwind CSS', tech: 'Tailwind CSS', status: 'learning' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', tech: 'Node.js' },
      { name: 'Express.js', tech: 'Express' },
      { name: 'RESTful APIs' },
      { name: 'JWT authentication', tech: 'JWT' },
      { name: 'Middleware' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', tech: 'MongoDB' },
      { name: 'Mongoose', tech: 'Mongoose' },
      { name: 'SQL' },
      { name: 'SQLite', tech: 'SQLite' },
      { name: 'PostgreSQL', tech: 'PostgreSQL', status: 'learning' },
    ],
  },
  {
    title: 'Tools and Practices',
    skills: [
      { name: 'Git', tech: 'Git' },
      { name: 'GitHub', tech: 'GitHub' },
      { name: 'Agile' },
      { name: 'Object-oriented programming' },
      { name: 'JSON and Web Storage APIs' },
      { name: 'Async/await and promises' },
      { name: 'Automated testing' },
      { name: 'Docker', tech: 'Docker', status: 'learning' },
    ],
  },
];
