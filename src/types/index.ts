// The shape every entry in data/projects.ts has to match.

// Drives the label on the card, and gives something to filter by later.
export type ProjectKind = 'full-stack' | 'front-end' | 'database';

// A union, not a boolean, so a third tier can be added without editing every project.
export type ProjectGroup = 'featured' | 'other';

// A named decision with the reasoning behind it.
export type Decision = { title: string; body: string };

// Optional long-form write-up. A project only gets a page once it has one of these.
export type CaseStudy = {
  // One line under the title, sharper than the card description.
  tagline: string;
  timeframe?: string;
  problem: string[];
  approach: string[];
  decisions?: Decision[];
  learned: string[];
};

export type Project = {
  id: string; // internal only, used as the React key. Matches the repo name.
  title: string;
  description: string;
  kind: ProjectKind;
  group: ProjectGroup;
  stack: string[]; // shown as tags in this order, so lead with the good stuff

  // Optional: not every project has these written up or is deployed yet.
  features?: string[];
  liveUrl?: string;

  repoUrl: string;
  knownIssue?: string; // for being upfront about a limitation

  // Both themes, so the shot matches whichever the site is showing.
  // ratio is width over height, used to size the stacked layout precisely.
  screenshot?: { light: string; dark: string; ratio: number };

  // Render free tier sleeps when idle; pinged on the Projects page to wake it.
  // Must be a route that returns 200, or the ping shows as an error in the console.
  healthUrl?: string;

  // Written up properly, so it gets a page at /projects/<id>.
  caseStudy?: CaseStudy;
};

// Left off means comfortable with it; a union so 'exploring' can be added later.
export type SkillStatus = 'learning';

export type Skill = {
  name: string;
  status?: SkillStatus;
  // Key into techStyles in data/tech.ts; left off for skills with no logo.
  tech?: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};
