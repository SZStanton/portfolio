import type { SkillGroup } from '../types';

// Groupings follow the CV; `tech` points at data/tech.ts and is left off without a logo.
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
      { name: 'Bootstrap', tech: 'Bootstrap' },
      { name: 'Responsive and accessible design' },
      { name: 'Tailwind CSS', tech: 'Tailwind CSS', status: 'learning' },
      { name: 'Next.js', tech: 'Next.js', status: 'learning' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', tech: 'Node.js' },
      { name: 'Express.js', tech: 'Express' },
      { name: 'REST APIs' },
      { name: 'JWT authentication', tech: 'JWT' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', tech: 'MongoDB' },
      { name: 'Mongoose', tech: 'Mongoose' },
      { name: 'SQL', tech: 'SQL' },
      { name: 'SQLite', tech: 'SQLite' },
      { name: 'PostgreSQL', tech: 'PostgreSQL', status: 'learning' },
    ],
  },
  {
    title: 'Tools and Practices',
    skills: [
      { name: 'Git', tech: 'Git' },
      { name: 'GitHub', tech: 'GitHub' },
      { name: 'CI (GitHub Actions)' },
      { name: 'npm Workspaces' },
      { name: 'Automated testing (Vitest)' },
    ],
  },
];
