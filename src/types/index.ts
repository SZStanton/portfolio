import type { IconType } from 'react-icons'

// The shape every entry in data/projects.ts has to match.

// Drives the label on the card, and gives something to filter by later.
export type ProjectKind = 'full-stack' | 'front-end' | 'database'

// A union rather than a boolean, so a third tier can be added
// later without editing every project.
export type ProjectGroup = 'featured' | 'other'

export type Project = {
  id: string // internal only, used as the React key. Matches the repo name.
  title: string
  description: string
  kind: ProjectKind
  group: ProjectGroup
  capstone?: boolean // built as a bootcamp capstone, worth a badge on the card
  stack: string[] // shown as tags in this order, so lead with the good stuff

  // Optional, so components have to handle them being missing.
  // Not every project has these written up, and most are not deployed.
  features?: string[]
  futureImprovements?: string[]
  liveUrl?: string

  repoUrl: string
  knownIssue?: string // for being upfront about a limitation
}

// Left off means comfortable using it. A union rather than a boolean,
// so something like 'exploring' can be added later.
export type SkillStatus = 'learning'

export type Skill = {
  name: string
  status?: SkillStatus
  Icon?: IconType // only the ones with a real brand logo
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}
