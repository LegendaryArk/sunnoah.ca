export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "top", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
