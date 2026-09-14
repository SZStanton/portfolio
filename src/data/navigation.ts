export type Section = {
  id: string;
  label: string;
};

// Sections the navbar links to, in the order they appear down the page. The hero
// is deliberately absent: scrolling up is free and BackToTop already covers it.
export const navSections: Section[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];

// Stable array for the scroll spy, so its observer is not rebuilt every render.
export const sectionIds = navSections.map(section => section.id);
