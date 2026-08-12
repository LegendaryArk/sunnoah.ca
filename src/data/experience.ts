export interface Experience {
  id: string;
  period: string;
  role: string;
  org: string;
  meta: string;
  blurb: string;
  bullets: string[];
  stats: [string, string][];
  stack: string[];
  links: [string, string][];
  slot: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "warg",
    period: "2025 — NOW",
    role: "Embedded Flight Software Developer",
    org: "Waterloo Aerial Robotics Group",
    meta: "EXPERIENCE · SEP 2025 — PRESENT · TEAM OF 4",
    blurb:
      "Leading four engineers on a 32 MB flash driver in C++ for the STM32 Nucleo, storing configuration details and crash logs for the flight stack.",
    bullets: [
      "Led 4 engineers to develop a 32 MB flash driver using C++ on the STM32 Nucleo to store config details and crash logs",
      "Built an RTOS-integrated Flash Translation Layer with garbage collection and wear leveling, enhancing flash longevity",
    ],
    stats: [
      ["ROLE", "Lead"],
      ["TEAM", "4 engineers"],
      ["TARGET", "STM32 Nucleo"],
      ["STORAGE", "32 MB flash"],
    ],
    stack: ["C++", "STM32", "RTOS", "SPI", "Foxglove", "Git"],
    links: [
      ["Team site", "↗"],
      ["GitHub", "↗"],
    ],
    slot: "[ PHOTO — STM32 BENCH SETUP ]",
  },
  {
    id: "foundry",
    period: "2026",
    role: "Forward Deployed Engineer",
    org: "Ascendance Foundry",
    meta: "EXPERIENCE · JAN 2026 — APR 2026",
    blurb:
      "Deployed AI workflow automations directly with clients, then built the data plumbing to prove they worked.",
    bullets: [
      "Developed 5 AI workflow automations, introducing input validation and reducing human error by 80%",
      "Built a GTM automation that uses Python Playwright to find leads and generate outreach emails using Claude API",
      "Implemented 2 ETL pipelines using Azure Data Factory, delivering per-project statistic dashboards in Power BI",
    ],
    stats: [
      ["AUTOMATIONS", "5"],
      ["ERROR REDUCTION", "80%"],
      ["PIPELINES", "2 ETL"],
    ],
    stack: ["Python", "Playwright", "Claude API", "Azure Data Factory", "Power BI"],
    links: [["Company", "↗"]],
    slot: "[ SCREENSHOT — POWER BI DASHBOARD ]",
  },
  {
    id: "elapse",
    period: "2024 — 2025",
    role: "Co-founder & Lead Developer",
    org: "Elapse",
    meta: "EXPERIENCE · JUN 2024 — AUG 2025 · TEAM OF 4",
    blurb:
      "An iOS and Android app for the 100,000-member VEX Robotics Competition community: real-time schedules, rankings and match data, built in Flutter with four developers.",
    bullets: [
      "Led 4 developers to build an iOS/Android Flutter app serving the 100k+ member VEX Robotics Competition community with real-time schedules, rankings, and match data, receiving 3500+ downloads and a 5.0-star rating",
      "Designed adaptive match times and scouting forms, increasing team productivity at tournaments by 35%",
      "Integrated Firebase and Cloud Functions to sync data between team members, reducing scouting times by 30%",
    ],
    stats: [
      ["DOWNLOADS", "3,500+"],
      ["RATING", "5.0 ★"],
      ["REACH", "100k members"],
      ["PRODUCTIVITY", "+35%"],
    ],
    stack: ["Flutter", "Dart", "Firebase", "Cloud Functions"],
    links: [
      ["App Store", "↗"],
      ["Google Play", "↗"],
      ["GitHub", "↗"],
    ],
    slot: "[ SCREENSHOT — ELAPSE APP ]",
  },
  {
    id: "checkmate",
    period: "2019 — 2025",
    role: "V5RC Team Programming Lead",
    org: "Checkmate Robotics",
    meta: "EXPERIENCE · JUN 2019 — AUG 2025 · TEAM OF 6",
    blurb:
      "Six years of competitive robotics: robot design, library architecture, and the control tuning that put the team at the World Championship five years running.",
    bullets: [
      "Led team of 6 in robot design and library architecture, winning the Create (innovation) Award at VEX Worlds 2024",
      "Engineered ArkLib, a modular C++ motion control library focused on scalability and flexibility using OOP, qualifying the team to VEX Worlds in 5 consecutive years and winning the Think (programming) Award at international events",
      "Designed and tuned PID and control algorithms, achieving 1”/1° precision movements across 300+ matches",
    ],
    stats: [
      ["WORLDS", "5 consecutive"],
      ["PRECISION", "1″ / 1°"],
      ["MATCHES", "300+"],
      ["TEAM", "6"],
    ],
    stack: ["C++", "OOP", "PID Control", "Motor Control", "Kinematics"],
    links: [
      ["Demo video", "↗"],
      ["GitHub", "↗"],
    ],
    slot: "[ PHOTO — COMPETITION ROBOT ]",
  },
  {
    id: "mi3l",
    period: "2024",
    role: "VEX AI Embedded Systems Lead",
    org: "Mi3L Schools",
    meta: "EXPERIENCE · MAY 2024 — JUN 2024",
    blurb:
      "Bridged a depth camera to a VEX Brain so the robot could navigate the field on its own — and won two awards doing it.",
    bullets: [
      "Developed an API for the VEX Brain to process 3D spatial data from the Intel RealSense depth camera via the Jetson Nano for adaptive field navigation",
      "Won the Innovate Award and Skills World Champion at VEX AI Worlds 2024",
    ],
    stats: [
      ["AWARDS", "2"],
      ["SENSOR", "Intel RealSense"],
      ["COMPUTE", "Jetson Nano"],
    ],
    stack: ["C++", "Python", "Jetson Nano", "RealSense", "OpenCV"],
    links: [["Demo video", "↗"]],
    slot: "[ PHOTO — JETSON + REALSENSE RIG ]",
  },
];
