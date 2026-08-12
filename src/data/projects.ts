export type ProjectCategory = "robotics" | "embedded" | "software";

export interface Project {
  id: string;
  name: string;
  year: string;
  cat: ProjectCategory;
  kicker: string;
  meta: string;
  short: string;
  blurb: string;
  bullets: string[];
  stats: [string, string][];
  stack: string[];
  links: [string, string][];
  slot: string;
}

export const PROJECTS: Project[] = [
  {
    id: "autofleet",
    name: "AutoFleet",
    year: "2026",
    cat: "robotics",
    kicker: "MULTI-ROBOT · ESP32",
    meta: "PROJECT · 2026 · SOLO",
    short:
      "Central arbiter with space-time A* planning, AprilTag localization fused with wheel odometry.",
    blurb:
      "Multi-robot coordination: a central arbiter running space-time A* so several robots can traverse a shared space without colliding, plus a wireless command path and fused localization.",
    bullets: [
      "Built a multi-robot central arbiter with space-time A* path planning to avoid collisions during coordinated traversal",
      "Programmed an ESP32 WiFi-UART bridge with a TCP server to relay JSON commands, enabling wireless robot control",
      "Integrated AprilTag localization with EMA-smoothed pose fused with wheel odometry, boosting precision by 30%",
    ],
    stats: [
      ["PLANNER", "space-time A*"],
      ["PRECISION", "+30%"],
      ["TRANSPORT", "TCP / UART"],
    ],
    stack: ["C++", "ESP32", "ROS2", "AprilTag", "TCP", "UART"],
    links: [
      ["GitHub repo", "↗"],
      ["Demo video", "↗"],
    ],
    slot: "[ HERO — AUTOFLEET ROBOTS ON FIELD ]",
  },
  {
    id: "signal",
    name: "Signal",
    year: "2026",
    cat: "software",
    kicker: "LLM AGENTS · FASTAPI",
    meta: "PROJECT · 2026",
    short: "Agent simulation kernel, Claude tool-use harness and SSE server, cleanly separated.",
    blurb:
      "A multi-layer LLM agent simulation platform and dashboard, with a strict separation between the simulation kernel, the model harness, and the transport layer.",
    bullets: [
      "Built a multi-layer LLM agent simulation and dashboard in Python and JavaScript with clean separation across a simulation kernel, Claude tool-use harness, and FastAPI/SSE server",
      "Implemented structured tool-use over Claude API with prompt caching, reducing per-step latency and token cost",
    ],
    stats: [
      ["LAYERS", "3"],
      ["TRANSPORT", "FastAPI / SSE"],
      ["CACHING", "prompt cache"],
    ],
    stack: ["Python", "JavaScript", "FastAPI", "SSE", "Claude API"],
    links: [
      ["GitHub repo", "↗"],
      ["Live demo", "↗"],
    ],
    slot: "[ SCREENSHOT — SIGNAL DASHBOARD ]",
  },
  {
    id: "citywatch",
    name: "CityWatch",
    year: "2025",
    cat: "software",
    kicker: "COMPUTER VISION · RN",
    meta: "PROJECT · 2025 · TEAM OF 4",
    short: "50k+ reports, a MobileNetV2 defect classifier at 95% accuracy, PostGIS risk forecasts.",
    blurb:
      "A civic reporting platform that turns 50,000+ citizen reports into forecasted risk heatmaps for road maintenance crews.",
    bullets: [
      "Led a team of 4 to build a reporting platform using React Native to analyze 50k+ reports to identify high-risk zones",
      "Trained a MobileNetV2 road defect classifier with an OpenCV preprocessing pipeline, achieving 95%+ accuracy",
      "Forecasted 30–365 day risk heatmaps from spatial incident patterns and features stored in a PostGIS database",
    ],
    stats: [
      ["REPORTS", "50k+"],
      ["ACCURACY", "95%+"],
      ["FORECAST", "30–365 days"],
    ],
    stack: ["React Native", "TensorFlow", "OpenCV", "PostGIS", "Python"],
    links: [
      ["GitHub repo", "↗"],
      ["Live deployment", "↗"],
    ],
    slot: "[ SCREENSHOT — CITYWATCH HEATMAP ]",
  },
  {
    id: "nav",
    name: "Autonomous Navigation",
    year: "2025",
    cat: "robotics",
    kicker: "LIDAR · PURE PURSUIT",
    meta: "PROJECT · 2025",
    short: "A* over a LiDAR occupancy grid with dynamic replanning and a Pure Pursuit controller.",
    blurb:
      "A full navigation stack on a LiDAR-built occupancy grid: cost-weighted planning, dynamic replanning as the map changes, and a Pure Pursuit controller following the result.",
    bullets: [
      "Implemented A* path planning on a LiDAR-generated occupancy grid with cost-weighted traversal, dynamic replanning, and distance-weighted obstacle inflation at 0.1 m resolution",
      "Built a Pure Pursuit controller with odometry-fused map memory for persistent global mapping across robot motion",
    ],
    stats: [
      ["RESOLUTION", "0.1 m"],
      ["PLANNER", "A* + replan"],
      ["CONTROL", "Pure Pursuit"],
    ],
    stack: ["C++", "ROS2", "LiDAR", "Pure Pursuit", "Odometry"],
    links: [
      ["GitHub repo", "↗"],
      ["Demo video", "↗"],
    ],
    slot: "[ SCREENSHOT — OCCUPANCY GRID ]",
  },
  {
    id: "decks",
    name: "Decks",
    year: "2025",
    cat: "embedded",
    kicker: "CARD SHUFFLER · PICO",
    meta: "PROJECT · 2025",
    short: "Automated playing-card shuffler on a custom 3D-printed chassis, firmware in MicroPython.",
    blurb:
      "An end-to-end embedded build: mechanical design, 3D-printed chassis, and firmware driving motors, sensors and status LEDs.",
    bullets: [
      "Architected a full embedded system for an automated playing card shuffler built on a custom 3D-printed chassis",
      "Developed embedded firmware in MicroPython on a Raspberry Pi Pico for motor control, sensor polling, and status LEDs",
    ],
    stats: [
      ["MCU", "RPi Pico"],
      ["CHASSIS", "3D printed"],
      ["FIRMWARE", "MicroPython"],
    ],
    stack: ["MicroPython", "Raspberry Pi Pico", "SolidWorks", "3D Printing"],
    links: [
      ["GitHub repo", "↗"],
      ["Build log", "↗"],
    ],
    slot: "[ PHOTO — SHUFFLER HARDWARE ]",
  },
  {
    id: "vexdex",
    name: "VexDex",
    year: "2025",
    cat: "software",
    kicker: "DATA · AZURE SQL",
    meta: "PROJECT · 2025",
    short: "8k+ data points over 40+ metrics, sub-100 ms queries on a composite-key schema.",
    blurb:
      "A competition data analysis service: a relational schema tuned for fast lookups behind a FastAPI surface.",
    bullets: [
      "Built full-stack competition data analysis with FastAPI endpoints, managing 8k+ data points over 40+ metrics",
      "Engineered a composite-key relational schema with indexing in Azure SQL, reducing database query time to <100 ms",
    ],
    stats: [
      ["DATA POINTS", "8k+"],
      ["METRICS", "40+"],
      ["QUERY TIME", "<100 ms"],
    ],
    stack: ["FastAPI", "Azure SQL", "Python", "Pandas"],
    links: [
      ["GitHub repo", "↗"],
      ["Live deployment", "↗"],
    ],
    slot: "[ SCREENSHOT — VEXDEX TABLES ]",
  },
];
