import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import type { SkillGroup } from '../types'

// Groupings follow the CV, so the two tell the same story.
// Anything marked 'learning' is being picked up right now, including
// on this site. Only skills with a real brand logo get an icon.
//
// color is the official brand colour, used in dark mode. colorLight is a
// deeper mix of it for the pale background, since brand palettes are built
// for dark screens and go washed out otherwise. Express, JWT, SQLite,
// Mongoose and GitHub are left uncoloured: their brand colours are near
// black, so they inherit the text colour and work in both themes.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', Icon: SiJavascript, color: '#f7df1e', colorLight: '#9a8100' },
      { name: 'Python', Icon: SiPython, color: '#4b9fd5', colorLight: '#2d6389' },
      { name: 'HTML5', Icon: SiHtml5, color: '#e34f26', colorLight: '#c03f18' },
      { name: 'CSS3', Icon: SiCss, color: '#4a9fe0', colorLight: '#175f95' },
      {
        name: 'TypeScript',
        Icon: SiTypescript,
        color: '#4b8fdb',
        colorLight: '#2761a3',
        status: 'learning',
      },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61dafb', colorLight: '#0b7f9e' },
      { name: 'Hooks, routing and state' },
      { name: 'Form validation' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: '#9a72d4', colorLight: '#61409a' },
      { name: 'Responsive and accessible design' },
      {
        name: 'Tailwind CSS',
        Icon: SiTailwindcss,
        color: '#38bdf8',
        colorLight: '#0b7d95',
        status: 'learning',
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#7cc35f', colorLight: '#3f7a32' },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'RESTful APIs' },
      { name: 'JWT authentication', Icon: SiJsonwebtokens },
      { name: 'Middleware' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#5cc063', colorLight: '#2f7a35' },
      { name: 'Mongoose', Icon: SiMongoose },
      { name: 'SQL' },
      { name: 'SQLite', Icon: SiSqlite },
    ],
  },
  {
    title: 'Tools and practices',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#f05032', colorLight: '#c73a1d' },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Agile' },
      { name: 'Object-oriented programming' },
      { name: 'JSON and Web Storage APIs' },
      { name: 'Async/await and promises' },
      { name: 'Automated testing' },
      {
        name: 'Docker',
        Icon: SiDocker,
        color: '#3ba3f0',
        colorLight: '#1668ad',
        status: 'learning',
      },
    ],
  },
]
