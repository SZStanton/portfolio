// All project content lives here, separate from the components that show it.
import itunesDark from '../assets/images/itunes/results-dark.png';
import itunesLight from '../assets/images/itunes/results-light.png';
import jobsDark from '../assets/images/jobs-app/dashboard-dark.png';
import jobsLight from '../assets/images/jobs-app/dashboard-light.png';
import todoDark from '../assets/images/to-do-tasks/dashboard-dark.jpg';
import todoLight from '../assets/images/to-do-tasks/dashboard-light.jpg';
import type { Project } from '../types';

// Typed, so a missing or misspelled field fails the build.
// Order here is the order projects appear on the page.
export const projects: Project[] = [
  {
    id: 'to-do-tasks',
    title: 'To-Do List App',
    description:
      'A full-stack MERN task manager with secure user accounts and private task storage. Each user gets their own task list, protected by JWT authentication and guarded API routes.',
    kind: 'full-stack',
    group: 'featured',
    capstone: true,
    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Context API',
      'Vite',
    ],
    features: [
      'Registration and login with hashed passwords',
      'JWT authentication with protected routes',
      'Create, edit, complete and delete tasks',
      'Drag-and-drop reordering, also operable from the keyboard',
      'Recycle bin, restorable for 24 hours',
      'Filter by All / Active / Completed, with a task counter',
      'One-click demo account, and rate-limited auth routes',
    ],
    futureImprovements: [
      { text: 'Dark mode toggle', done: true },
      { text: 'Drag-and-drop reordering', done: true },
      { text: 'Due dates and reminders' },
      { text: 'Task categories and tags' },
    ],
    repoUrl: 'https://github.com/SZStanton/To-Do-Tasks',
    liveUrl: 'https://to-do-tasks.szstanton.com/',
    // 1366x1049
    screenshot: { light: todoLight, dark: todoDark, ratio: 1.302 },
    healthUrl: 'https://api.to-do-tasks.szstanton.com/health',
    caseStudy: {
      tagline: 'Every account sees only its own list, and the app proves it.',
      problem: [
        'A task manager is only worth using if the tasks are genuinely private. That means real accounts, and it means every route has to be guarded rather than just the login screen.',
        'It also means being able to show it. Anyone can hide a button in the interface; the question worth answering is what happens when someone calls the API directly.',
      ],
      approach: [
        'React 19 and Vite on the front, Express 5 and Mongoose 9 behind it, with MongoDB Atlas for storage. JWT for sessions, bcrypt for hashing, and Zod validating on both sides of the wire.',
        'Tasks are scoped to the account inside the query itself rather than filtered in the browser, so a guarded route is the only way to reach them.',
        '112 tests run from a clean clone with no database and no credentials, alongside a separate route-level sweep against a throwaway test database.',
      ],
      decisions: [
        {
          title: 'Everything that expires is a TTL index, not a scheduled job',
          body: 'Deleting is a soft delete: deletedAt is set and expiresAt is pulled in to 24 hours, so the index Mongo already maintains does the purging. Accounts and their tasks go the same way after 60 days of inactivity. There is no cron to run and nothing to go stale.',
        },
        {
          title: 'Dragging is disabled while a filter is active',
          body: 'Reordering a list that is hiding half its items produces an order nobody can see. Cutting the scope was more honest than shipping the feature everywhere and letting it confuse people.',
        },
        {
          title: 'The validation rules exist twice on purpose',
          body: 'The client mirrors the server Zod schemas, and a cross-check runs every field against every awkward value asserting both produce identical messages. It is the most valuable test in the suite, because it is the one thing stopping the two copies drifting apart.',
        },
        {
          title: 'Login has no length rules, unlike registration',
          body: 'Enforcing them on login would leak the password policy to anyone probing the endpoint, and lock out accounts created under older rules. Passwords are capped at 72 characters because that is bcrypt ceiling, past which it silently truncates.',
        },
      ],
      learned: [
        'Node 25 on Windows could not resolve mongodb+srv:// at all. dns.getServers() returned 127.0.0.1 instead of the real resolvers, so every SRV lookup failed while Windows itself resolved the same host fine. It looks exactly like a bad connection string or a blocked Atlas address and is neither. Dropping to Node 24 LTS fixed it.',
        'name and username started out sharing one builder, which is why the old signup form looked like it asked the same question twice. They do different jobs: one is a display name that keeps spaces and capitals, the other is a sign-in handle lowercased on save.',
        'The /health route is mounted above the CORS middleware deliberately, because a wake-up ping arrives from an origin that is not on the allowlist and still needs to get a 200 back.',
      ],
    },
  },
  {
    id: 'itunes-search',
    title: 'iTunes Search App',
    description:
      'A full-stack app for searching the iTunes Store through its public API, built as the capstone for a Full Stack with React and Express course.',
    kind: 'full-stack',
    group: 'featured',
    capstone: true,
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Zod',
    ],
    features: [
      'Keyword search against the iTunes API',
      'Filter across eight media types: music, album, music video, podcast, audiobook, TV, software and ebook',
      'Favourites and search history saved to the account',
      'Artwork viewer tinted from the cover art',
      'Paging by button, arrow key, screen edge or swipe',
      'One-click demo account',
    ],
    futureImprovements: [
      { text: 'Dark mode toggle', done: true },
      { text: 'Persist favourites across sessions', done: true },
      { text: 'Sort results by release date or name', done: true },
    ],
    repoUrl: 'https://github.com/SZStanton/iTunes-Search',
    liveUrl: 'https://itunes-search.szstanton.com/',
    // knownIssue removed: favourites now persist, so it was out of date.
    // 1440x900
    screenshot: { light: itunesLight, dark: itunesDark, ratio: 1.6 },
    healthUrl: 'https://api.itunes-search.szstanton.com/api/health',
    caseStudy: {
      tagline:
        'Eight media types, and an API that stays quiet about the two it cannot serve.',
      problem: [
        "Apple's iTunes Search API is public and free, which makes it a good place to practise working against someone else's service. It is also thin on documentation where it matters, and it does not tell you when it has nothing to give you.",
        "The first version was session-only. Favourites vanished on refresh, which meant the app could show you things but could not remember anything about you. Fixing that meant accounts, and accounts meant a real backend rather than a search box sitting in front of someone else's API.",
      ],
      approach: [
        'Rebuilt in Aug 2026 from a session-only Bootstrap app into a full-stack one. React, Vite and Tailwind v4 on the front, Express and Mongoose behind it, MongoDB Atlas for storage and JWT for sessions.',
        'The Zod schemas are shared by both sides rather than written twice, so the client and the API cannot drift apart about what a valid request looks like.',
        'Favourites and search history save against the account, so they survive a refresh, a new tab or a different device.',
        '294 tests run from a clean clone, alongside a route-level sweep against a separate test database.',
      ],
      decisions: [
        {
          title: 'Movie and Short Film were removed rather than fixed',
          body: 'Apple returns nothing for either in any storefront, so they were dead controls dressed up as features. Album and Music Video replaced them, both checked against real responses first. A filter that silently returns nothing is worse than one filter fewer.',
        },
        {
          title: 'Paging works four ways because results are for browsing',
          body: 'Buttons, arrow keys, a click at the screen edge, or a swipe on touch. Search results are something you move through rather than read once, so the interaction should suit whatever device is in front of you.',
        },
        {
          title: 'The artwork viewer takes its colour from the artwork',
          body: 'Rather than a fixed backdrop, the surround is tinted from the cover it is showing, so the image sits in something that belongs to it instead of in a generic box.',
        },
      ],
      learned: [
        'The design pass taught me more than the API did. Replacing flat Bootstrap with a real elevation and lighting system, gradients, shading, glass and a tinted shadow ladder across both themes, is what stopped it looking like a tutorial.',
        'It is the one project with analytics and Core Web Vitals actually wired up, which is the difference between believing something works and being able to check.',
        'Checking a third-party API response before building an interface on top of it, rather than trusting the documented list, would have saved building two filters twice.',
      ],
    },
  },
  {
    id: 'jobs-app',
    title: 'Jobs To-Do List',
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
      { text: 'Dark mode toggle', done: true },
      { text: 'Due dates and overdue alerts', done: true },
      { text: 'Keyword search', done: true },
    ],
    repoUrl: 'https://github.com/SZStanton/Jobs-App',
    liveUrl: 'https://jobs-app.szstanton.com/',
    // 1280x1026
    screenshot: { light: jobsLight, dark: jobsDark, ratio: 1.248 },
    healthUrl: 'https://jobs-app-api-ivt0.onrender.com/health',
    caseStudy: {
      tagline: 'The work that is late tells you so.',
      problem: [
        'A maintenance list is only useful if it says what is overdue without being asked. The interesting part is not storing jobs, it is making sure what is on screen is actually true.',
        'The first version worked on my machine and could not be deployed. The API URL was hardcoded, the validation rules existed only in the browser, and delete was protected in the interface but not on the server.',
      ],
      approach: [
        'Rebuilt in Aug 2026: React 19 and Vite on the front, Express 5 and Mongoose 9 behind it, MongoDB Atlas for storage, and validation enforced on the server rather than just in the form.',
        'Jobs carry a description, location, priority and an optional due date. Filtering by status and searching description and location happen together rather than as separate modes.',
        '69 tests run from a clean clone with no database and no credentials, plus a route-level sweep of around 50 checks against a separate test database.',
      ],
      decisions: [
        {
          title: 'Overdue is computed, not stored',
          body: 'It is worked out per render from the due date, so there is no scheduled task and no stored flag that can quietly go stale. It is also the short answer to how you avoid needing a cron job for something like this.',
        },
        {
          title: 'Batch update acts only on what is on screen',
          body: 'A job hidden by a filter or a search keeps its tick, but is left out of the request and gets the tick back when it reappears. This one reached main three times by three different routes before it earned its own regression tests.',
        },
        {
          title: 'The API has no custom domain, on purpose',
          body: 'Render free tier allows two and both were spent on the other projects. Nothing depends on it: the portfolio reaches this API on its onrender.com address and gets the same 200 back.',
        },
      ],
      learned: [
        'The test suite is pinned to a timezone behind UTC. The due-date logic reads as correct at UTC+2 whether or not the code is right, so running the tests in local time would let them pass against broken code. Testing something you cannot see sometimes means deliberately standing somewhere awkward.',
        'The batch-selection bug is the one I learned most from. It came back three times by three different routes, which is what finally convinced me the fix belonged in a test rather than in remembering to be careful.',
        'Team assignment and CSV export were both cut deliberately. Assignment needs accounts, which is a different project, and neither was worth shipping half-finished.',
      ],
    },
  },
  {
    id: 'event-planner',
    title: 'Personal Event Planner',
    description:
      'A React app for creating and tracking personal and professional events, from meetings and appointments to social plans. Built to get comfortable with shared state across a whole app using Context API, with no backend involved.',
    kind: 'front-end',
    // Moved out of featured: no screenshot yet, so it looked thin beside the rest.
    group: 'other',
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
      { text: 'Dark mode toggle' },
      { text: 'Swap localStorage for a real backend and database' },
      { text: 'Event reminders and notifications' },
      { text: 'Calendar view' },
      { text: 'Support for recurring events' },
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
      { text: 'Export reports to CSV' },
      { text: 'Monthly spending summaries and charts' },
      { text: 'Recurring expense tracking' },
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
      { text: 'Dark mode toggle' },
      { text: 'Working login and registration with real authentication' },
      { text: 'Cart that persists between sessions' },
      { text: 'Checkout flow' },
      { text: 'Product search and filtering' },
    ],
    repoUrl: 'https://github.com/SZStanton/The-Cart',
    liveUrl: 'https://the-cart-six.vercel.app/',
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
    liveUrl: 'https://szstanton.github.io/e-commerce/',
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
      { text: 'Filter suggestions by cuisine or dietary preference' },
      { text: 'Save favourite dishes' },
      { text: 'Show the full recipe and ingredient list for each suggestion' },
    ],
    repoUrl: 'https://github.com/SZStanton/Chefs-Favorites',
    liveUrl: 'https://szstanton.github.io/chefs-favorites/',
  },
];

// Anything with a written case study gets a page and joins the pager. Adding one
// is a data change; no component holds a list of which projects have pages.
export const caseStudies = projects.filter(project => project.caseStudy);
