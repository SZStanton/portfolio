# Portfolio

Personal portfolio for **Sebastian Stanton**, a junior full-stack developer based in Cape Town.
Built with React, TypeScript, Tailwind CSS and a Vercel serverless function.

**Live at [szstanton.com](https://szstanton.com)**

![The portfolio home page in dark mode](public/og-image.jpg)

---

## About

A portfolio built from scratch rather than from a template: one scrolling page for the
recruiter's read-through, with a real route per project for anyone who wants the detail. The visual direction is
restrained art deco: a neutral palette, gold used only as an accent, and a geometric display face
paired with a readable body face.

It is also the project I am using to learn TypeScript and Tailwind, so a fair amount of the code
exists to work those out in the open rather than because a portfolio strictly needs it.

## Features

- **One scrolling page** with a scroll spy driving the nav, plus case-study routes and a 404
- **Light and dark themes**, remembered between visits and applied before first paint so there is no flash
- **Contact form** with shared validation rules, a honeypot, rate limiting and sender domain checks
- **Deferred loading**, so the contact form's validation libraries and the project screenshots
  only arrive as you approach them
- **Animated art deco background**, drawn as SVG geometry and paused for reduced-motion users
- **Certificates** in the experience timeline, opening full size in a lightbox
- **Accessibility**: skip link, keyboard navigation, focus rings, `aria-live` form status, reduced-motion support

## Built with

|               |                                                                 |
| ------------- | --------------------------------------------------------------- |
| **Framework** | React 19, TypeScript 6, Vite 8                                  |
| **Routing**   | React Router 8                                                  |
| **Styling**   | Tailwind CSS 4, CSS-first config                                |
| **Animation** | Motion, loaded lazily                                           |
| **Forms**     | React Hook Form + Zod                                           |
| **Icons**     | react-icons: Lucide for interface, Simple Icons for brand logos |
| **Fonts**     | Josefin Sans and Manrope, self-hosted variable fonts            |
| **Backend**   | Vercel serverless function, Resend for delivery                 |
| **CI**        | GitHub Actions, lint and build on every push and pull request   |

## Running it locally

```bash
git clone https://github.com/SZStanton/portfolio.git
cd portfolio
npm install
npm run dev
```

The contact form needs two environment variables. Copy the example file and fill them in:

```bash
cp .env.example .env.local
```

| Variable           | What it is                                    |
| ------------------ | --------------------------------------------- |
| `RESEND_API_KEY`   | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Where form submissions are delivered          |

Note that `npm run dev` runs Vite only, so `/api/contact` will not exist. Testing the form locally
needs `vercel dev`.

### Scripts

| Command           | Does                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the dev server                  |
| `npm run build`   | Type-check, then build for production |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | Run ESLint                            |

## Structure

```
src/
├── assets/          Certificates, photo, CV. Imported, so they get hashed
├── components/
│   ├── layout/      Navbar, Footer, Layout, ProjectPager
│   ├── sections/    The home page in order: Hero, Projects, About, Toolkit, Contact
│   ├── deco/        Art deco background geometry, drawn as SVG
│   └── ui/          Button, TechIcon, Lightbox, and friends
├── pages/           One file per route: home, case study, 404
├── data/            Projects, skills, navigation, tech colours
├── hooks/           Theme, scroll spy, hash landing, lazy loading, warm-ups
├── lib/             Zod schemas, motion values, deco geometry
└── types/           Shared types
api/
└── contact.ts       Serverless function, form to inbox
```

## Contact

Via the [contact form](https://szstanton.com/#contact), or on
[LinkedIn](https://www.linkedin.com/in/sebastian-stanton-5464b0139).
