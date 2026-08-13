export interface COURSE {
  name: string;
  code: string;
  desc: string;
  link: string;
}

export const EDUCATION = {
  dates: "SEP 2025 — APR 2030",
  school: "University of Waterloo",
  program: "BASc. Mechatronics Engineering",
  gpa: "3.92",
  gpaScale: "GPA / 4.00",
};

export const COURSES = [
  { name: "Algorithms and Data Structures", code: "MTE140", desc: "Study of algorithms and data structures", link: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/courses/view/69a04df20cc3a4f01d875db7" },
  { name: "Circuits", code: "MTE120", desc: "Analysis and design of electrical circuits", link: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/courses/view/65abeb65b44f43498069a266" },
  { name: "Digital Logic", code: "MTE262", desc: "Design of digital systems and logic circuits", link: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/courses/view/698e1d8da48593c8b947e2c4" },
  { name: "Linear Algebra", code: "MATH115", desc: "Study of vector spaces and linear transformations", link: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/courses/rJfYkYEXYh" },
];
