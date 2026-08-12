import type { IconType } from 'react-icons'
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
  SiPython,
  SiReact,
  SiReactrouter,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

/*
 * Logo and colours for a tech name, looked up by whatever string is used
 * in projects.ts. Anything not listed just renders as plain text.
 *
 * color is the brand one, used in dark mode. colorLight is a deeper mix
 * for the pale background. A few are left without colours because their
 * brand colour is near black and disappears in dark mode.
 */
export type TechStyle = {
  Icon: IconType
  color?: string
  colorLight?: string
}

export const techStyles: Record<string, TechStyle> = {
  React: { Icon: SiReact, color: '#61dafb', colorLight: '#0b7f9e' },
  'React Router': { Icon: SiReactrouter, color: '#f4643f', colorLight: '#c23f1e' },
  'Node.js': { Icon: SiNodedotjs, color: '#7cc35f', colorLight: '#3f7a32' },
  Express: { Icon: SiExpress },
  MongoDB: { Icon: SiMongodb, color: '#5cc063', colorLight: '#2f7a35' },
  Mongoose: { Icon: SiMongoose },
  JWT: { Icon: SiJsonwebtokens },
  Vite: { Icon: SiVite, color: '#a970ff', colorLight: '#6f3fd4' },
  Bootstrap: { Icon: SiBootstrap, color: '#9a72d4', colorLight: '#61409a' },
  Axios: { Icon: SiAxios, color: '#8a6bd1', colorLight: '#5a3fa0' },
  Formik: { Icon: SiFormik, color: '#4fb8d8', colorLight: '#1d7d9c' },
  Python: { Icon: SiPython, color: '#4b9fd5', colorLight: '#2d6389' },
  SQLite: { Icon: SiSqlite },
  HTML: { Icon: SiHtml5, color: '#e34f26', colorLight: '#c03f18' },
  CSS: { Icon: SiCss, color: '#4a9fe0', colorLight: '#175f95' },
  JavaScript: { Icon: SiJavascript, color: '#f7df1e', colorLight: '#9a8100' },
  TypeScript: { Icon: SiTypescript, color: '#4b8fdb', colorLight: '#2761a3' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38bdf8', colorLight: '#0b7d95' },
  Docker: { Icon: SiDocker, color: '#3ba3f0', colorLight: '#1668ad' },
  Git: { Icon: SiGit, color: '#f05032', colorLight: '#c73a1d' },
  GitHub: { Icon: SiGithub },
}
