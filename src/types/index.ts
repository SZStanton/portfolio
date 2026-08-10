// Card label, and something to filter by later. Safe to add to.
export type ProjectKind = 'full-stack' | 'front-end' | 'database'

// Text options rather than true/false, so a third tier can be added later.
export type ProjectGroup = 'featured' | 'other'

export type Project = {
  id: string // lowercase-with-dashes, matching the repo name
  title: string
  description: string
  kind: ProjectKind
  group: ProjectGroup
  capstone?: boolean // built as a bootcamp capstone — worth calling out on the card
  stack: string[] // shown as tags in this order, so lead with the good stuff
  features?: string[] // the ? means it can be left out
  futureImprovements?: string[]
  repoUrl: string
  liveUrl?: string
  knownIssue?: string // for being upfront about a limitation
}
