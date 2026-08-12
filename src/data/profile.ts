export interface StatRailItem {
  value: string;
  label: string;
}

export const STAT_RAIL: StatRailItem[] = [
  { value: "3.92", label: "GPA / 4.00" },
  { value: "5", label: "WORLDS APPEARANCES" },
  { value: "3.5k+", label: "APP DOWNLOADS" },
  { value: "1″/1°", label: "MOTION PRECISION" },
];

export interface ContactLink {
  label: string;
  href: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: "nn2sun@uwaterloo.ca", href: "mailto:nn2sun@uwaterloo.ca" },
  { label: "github.com/LegendaryArk", href: "https://github.com/LegendaryArk" },
  { label: "linkedin.com/in/sunnoah", href: "https://linkedin.com/in/sunnoah" },
];

export const PHONE = "(647) 700-5886";
export const LOCATION = "Waterloo, ON";
export const FOOTER_NAME = "NOAH SUN — 2026";
export const FOOTER_EMAIL = "NN2SUN@UWATERLOO.CA";
