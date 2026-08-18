export interface ResumeVariant {
  id: string;
  tab: string;
  title: string;
  file: string;
  src: string;
  note: string;
  highlights: [string, string][];
}

export const RESUMES: ResumeVariant[] = [
  {
    id: "robotics",
    tab: "ROBOTICS / EMBEDDED",
    title: "Robotics & Embedded",
    file: "noah_sun_resume_robotics.pdf",
    src: "/resumes/noah_sun_resume_robotics.pdf",
    note: "Leads with multi-robot coordination, LiDAR navigation, and firmware. Best fit for robotics and hardware teams.",
    highlights: [
      ["LEADS WITH", "AutoFleet · Nav stack"],
      ["HARDWARE", "STM32, Pico, Jetson"],
      ["CONTROLS", "ROS2, RTOS, PID, Kinematics"],
    ],
  },
  {
    id: "software",
    tab: "SOFTWARE / DATA",
    title: "Software & Data",
    file: "noah_sun_resume_software.pdf",
    src: "/resumes/noah_sun_resume_software.pdf",
    note: "Leads with the LLM agent platform, ETL and data work, and the full-stack projects. Best fit for SWE and data internships.",
    highlights: [
      ["LEADS WITH", "Signal · CityWatch"],
      ["LANGUAGES", "C/C++, Python, TS, Dart"],
      ["DATA", "PostgreSQL, Azure, PostGIS"],
    ],
  },
];
