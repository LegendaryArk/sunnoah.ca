export interface Award {
  year: string;
  title: string;
  where: string;
}

export const AWARDS: Award[] = [
  { year: "2024", title: "Create Award — innovation", where: "VEX Robotics World Championship" },
  { year: "2024", title: "Innovate Award + Skills World Champion", where: "VEX AI World Championship" },
  { year: "2020 — 2024", title: "Think Award — programming", where: "VEX international events" },
  { year: "2019 — 2025", title: "Five consecutive Worlds qualifications", where: "Checkmate Robotics, V5RC" },
];

export const EDUCATION = {
  dates: "SEP 2025 — APR 2030",
  school: "University of Waterloo",
  program: "BASc. Mechatronics Engineering (Candidate)",
  gpa: "3.92",
  gpaScale: "GPA / 4.00",
};

export const COURSES = ["Algorithms and Data Structures", "Circuits", "Digital Logic"];
