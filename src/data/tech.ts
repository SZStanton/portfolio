import type { IconType } from 'react-icons';
import {
  SiAxios,
  SiBootstrap,
  SiCss,
  SiDocker,
  SiExpress,
  SiFormik,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactrouter,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

// Logos and colours, looked up by the names used in projects.ts and skills.ts.
// color is for dark mode, colorLight for the pale background.
export type TechStyle = {
  Icon: IconType;
  color: string;
  colorLight: string;
};

// Light values are saturated rather than just dark, so they stay rich
// against the off-white. The near-black brands go the other way round.
export const techStyles: Record<string, TechStyle> = {
  React: { Icon: SiReact, color: '#61dafb', colorLight: '#098caa' },
  'React Router': {
    Icon: SiReactrouter,
    color: '#f4643f',
    colorLight: '#c33712',
  },
  'Node.js': { Icon: SiNodedotjs, color: '#7cc35f', colorLight: '#398b18' },
  Express: { Icon: SiExpress, color: '#d6d6db', colorLight: '#1c1c20' },
  MongoDB: { Icon: SiMongodb, color: '#5cc063', colorLight: '#158417' },
  Mongoose: { Icon: SiMongoose, color: '#e08a8a', colorLight: '#aa0e0e' },
  JWT: { Icon: SiJsonwebtokens, color: '#d6a9e8', colorLight: '#7226a8' },
  Vite: { Icon: SiVite, color: '#a970ff', colorLight: '#632cd3' },
  Bootstrap: { Icon: SiBootstrap, color: '#9a72d4', colorLight: '#642cba' },
  Axios: { Icon: SiAxios, color: '#8a6bd1', colorLight: '#5620d6' },
  Formik: { Icon: SiFormik, color: '#4fb8d8', colorLight: '#1257b8' },
  Python: { Icon: SiPython, color: '#4b9fd5', colorLight: '#0e6fb3' },
  SQLite: { Icon: SiSqlite, color: '#6cb8dd', colorLight: '#005b85' },
  HTML: { Icon: SiHtml5, color: '#e34f26', colorLight: '#c9390d' },
  CSS: { Icon: SiCss, color: '#4a9fe0', colorLight: '#0b69b6' },
  JavaScript: { Icon: SiJavascript, color: '#f7df1e', colorLight: '#ae9a04' },
  TypeScript: { Icon: SiTypescript, color: '#4b8fdb', colorLight: '#146398' },
  'Tailwind CSS': {
    Icon: SiTailwindcss,
    color: '#38bdf8',
    colorLight: '#097faa',
  },
  Docker: { Icon: SiDocker, color: '#3ba3f0', colorLight: '#0d74c9' },
  Git: { Icon: SiGit, color: '#f05032', colorLight: '#c73110' },
  GitHub: { Icon: SiGithub, color: '#e6e6e6', colorLight: '#1f1f22' },
  PostgreSQL: { Icon: SiPostgresql, color: '#5fa8dc', colorLight: '#15618f' },
};
