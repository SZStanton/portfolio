export type Section = {
  id: string;
  label: string;
  // Sections that sit under this nav item without being one themselves. Without
  // this the highlight would drop out over any stretch the nav has no entry for.
  also?: string[];
};

// What the navbar links to, in the order it appears down the page.
export const navSections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects', also: ['more-projects'] },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// Everything the scroll spy watches, in document order. Module level so the
// observer is not rebuilt on every render.
export const spyElementIds = navSections.flatMap(section => [
  section.id,
  ...(section.also ?? []),
]);

const navIdByElement = new Map(
  navSections.flatMap(section =>
    [section.id, ...(section.also ?? [])].map(id => [id, section.id] as const),
  ),
);

// Which nav item a watched section belongs to.
export function navIdFor(elementId: string) {
  return navIdByElement.get(elementId) ?? '';
}
