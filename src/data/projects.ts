// All project content lives here, separate from the components that show it.
import type { Project } from '../types'

// Typing the array is what turns a missing or misspelled field into a build
// error. Order here is the order they appear on the page.
export const projects: Project[] = [
  {
    id: 'to-do-tasks',
    title: 'To-Do List App',
    description:
      'A full-stack MERN task manager with secure user accounts and private task storage. Each user gets their own task list, protected by JWT authentication and guarded API routes.',
    kind: 'full-stack',
    group: 'featured',
    capstone: true,
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Context API', 'Vite'],
    features: [
      'Registration and login with hashed passwords',
      'JWT authentication with protected routes',
      'Create, edit, complete and delete tasks',
      'Filter by All / Active / Completed, with a task counter',
      'Responsive interface',
    ],
    futureImprovements: [
      'Dark mode toggle',
      'Due dates and reminders',
      'Task categories and tags',
      'Drag-and-drop reordering',
    ],
    repoUrl: 'https://github.com/SZStanton/To-Do-Tasks',
  },
  {
    id: 'itunes-search',
    title: 'iTunes Search App',
    description:
      'A full-stack app for searching the iTunes Store through its public API, built as the capstone for a Full Stack with React and Express course.',
    kind: 'full-stack',
    group: 'featured',
    capstone: true,
    stack: ['React', 'Node.js', 'Express', 'JWT', 'Bootstrap', 'Vite'],
    features: [
      'Keyword search against the iTunes API',
      'Filter by media type: music, movies, podcasts, audiobooks, TV, ebooks and more',
      'Add and remove favourites',
      'Paginated search results',
    ],
    futureImprovements: [
      'Dark mode toggle',
      'Persist favourites across sessions',
      'Sort results by release date or name',
    ],
    repoUrl: 'https://github.com/SZStanton/iTunes-Search',
    knownIssue:
      'The favourites list lives in the session only, so it resets on refresh. Persisting it to a database is the natural next step.',
  },
  {
    id: 'jobs-app',
    title: 'Jobs-To-Do-List',
    description:
      'A job-tracking tool for logging, filtering and updating maintenance jobs. Started life as a front-end-only project and was later extended into a full-stack app with a proper database behind it.',
    kind: 'full-stack',
    group: 'featured',
    capstone: true,
    stack: ['React', 'Axios', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    features: [
      'Submit jobs with description, location and priority',
      'Filter jobs by status',
      'Batch-update several jobs at once',
      'Archive completed jobs',
      'Full create, read, update and delete support',
    ],
    futureImprovements: [
      'Dark mode toggle',
      'Assign jobs to team members',
      'Due dates and overdue alerts',
      'Keyword search',
      'CSV export',
    ],
    repoUrl: 'https://github.com/SZStanton/Jobs-App',
  },
  {
    id: 'event-planner',
    title: 'Personal Event Planner',
    description:
      'A React app for creating and tracking personal and professional events, from meetings and appointments to social plans. Built to get comfortable with shared state across a whole app using Context API, with no backend involved.',
    kind: 'front-end',
    group: 'featured',
    capstone: true,
    stack: ['React', 'Vite', 'Context API', 'Bootstrap'],
    features: [
      'Registration and login',
      'Create, edit and delete events',
      'Dashboard of upcoming events',
      'Event validation',
      'Saves to localStorage so data survives a refresh',
      'Help page with usage instructions, and a responsive layout',
    ],
    futureImprovements: [
      'Dark mode toggle',
      'Swap localStorage for a real backend and database',
      'Event reminders and notifications',
      'Calendar view',
      'Support for recurring events',
    ],
    repoUrl: 'https://github.com/SZStanton/Event-Planner',
  },
  {
    id: 'expense-tracker',
    title: 'Expense & Budget Tracker',
    description:
      'A command-line Python app for tracking income and expenses, setting budgets by category and measuring progress toward savings goals. Built to practise relational data modelling and SQL, the side of databases the MongoDB projects do not cover.',
    kind: 'database',
    group: 'other',
    capstone: true,
    stack: ['Python', 'SQLite'],
    features: [
      'Add, update, delete and view income and expense records',
      'Category-based filtering of transactions',
      'Budget tracking per category against actual spend',
      'Financial goals calculator',
      'Menu-driven interface with nested submenus',
    ],
    futureImprovements: [
      'Export reports to CSV',
      'Monthly spending summaries and charts',
      'Recurring expense tracking',
    ],
    repoUrl: 'https://github.com/SZStanton/Expense-Tracker',
  },
  {
    id: 'e-bookstore-app',
    title: 'E-Bookstore App',
    description:
      'A command-line Python app for managing a bookstore catalogue, built around a SQLite database. Designed as a clerk-facing tool, with full create, read, update and delete support behind a menu-driven interface.',
    kind: 'database',
    group: 'other',
    stack: ['Python', 'SQLite'],
    features: [
      'Add, update, delete and search books in the catalogue',
      'SQLite-backed storage that persists between sessions',
      'Menu-driven interface built for clerk-style catalogue management',
    ],
    repoUrl: 'https://github.com/SZStanton/E-Bookstore-App',
  },
  {
    id: 'the-cart',
    title: 'The Cart',
    description:
      'A React storefront covering product browsing, cart management and multi-page routing. Built to practise component-based structure with React Router, handling product state, and validating forms with Formik.',
    kind: 'front-end',
    group: 'other',
    stack: ['React', 'React Router', 'Formik'],
    features: [
      'Browse products with images, descriptions and pricing',
      'Add to cart with a running total',
      'Pick product variants, such as colour',
      'Routing across Home, Products and About pages',
      'Form validation with Formik',
    ],
    futureImprovements: [
      'Dark mode toggle',
      'Working login and registration with real authentication',
      'Cart that persists between sessions',
      'Checkout flow',
      'Product search and filtering',
    ],
    repoUrl: 'https://github.com/SZStanton/The-Cart',
    knownIssue:
      'The login and register forms are interface only, so they do not actually authenticate anyone yet. Wiring up real authentication is the main thing this one still needs.',
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce (Web Storage Demo)',
    description:
      'A storefront built as a demonstration of browser data persistence, keeping user preferences and cart contents without any server behind it. My first project using four different storage methods side by side: cache, cookies, session storage and local storage.',
    kind: 'front-end',
    group: 'other',
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Storage API', 'Service Worker'],
    features: [
      'Username that persists across browser sessions using local storage',
      'Product cart with totals calculated on the fly',
      'Font preference selection, remembered between visits',
      'One-click reset of every stored preference',
      'Resource caching via a service worker for faster loads',
    ],
    repoUrl: 'https://github.com/SZStanton/E-Commerce',
    liveUrl: 'https://szstanton.github.io/E-Commerce/',
  },
  {
    id: 'chefs-favorites',
    title: "Chef's Favorites",
    description:
      'Submit a main ingredient and get a chef-picked dish back, with orders tracked through to completion. Real recipe data comes from TheMealDB API. This was my first time pulling live data from an API into a website, built in plain JavaScript with no framework involved.',
    kind: 'front-end',
    group: 'other',
    stack: ['HTML', 'CSS', 'JavaScript', 'TheMealDB API'],
    features: [
      'Enter a main ingredient and receive a suggested dish',
      'Real recipe data pulled live from TheMealDB API',
      'Pending orders list with completion tracking',
      'Styled interface built without a framework',
    ],
    futureImprovements: [
      'Filter suggestions by cuisine or dietary preference',
      'Save favourite dishes',
      'Show the full recipe and ingredient list for each suggestion',
    ],
    repoUrl: 'https://github.com/SZStanton/Chefs-Favorites',
    liveUrl: 'https://szstanton.github.io/Chefs-Favorites/',
  },
]
