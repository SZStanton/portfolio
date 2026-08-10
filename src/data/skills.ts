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
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', Icon: SiJavascript },
      { name: 'Python', Icon: SiPython },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
      { name: 'TypeScript', Icon: SiTypescript, status: 'learning' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Hooks, routing and state' },
      { name: 'Form validation' },
      { name: 'Bootstrap', Icon: SiBootstrap },
      { name: 'Responsive and accessible design' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, status: 'learning' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'RESTful APIs' },
      { name: 'JWT authentication', Icon: SiJsonwebtokens },
      { name: 'Middleware' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'Mongoose', Icon: SiMongoose },
      { name: 'SQL' },
      { name: 'SQLite', Icon: SiSqlite },
    ],
  },
  {
    title: 'Tools and practices',
    skills: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Agile' },
      { name: 'Object-oriented programming' },
      { name: 'JSON and Web Storage APIs' },
      { name: 'Async/await and promises' },
      { name: 'Automated testing' },
      { name: 'Docker', Icon: SiDocker, status: 'learning' },
    ],
  },
]
