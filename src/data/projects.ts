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
  img: string;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-redesign",
    name: "Personal Portfolio (Redesign)",
    year: "2026",
    cat: "software",
    kicker: "REACT · TAILWIND",
    meta: "REACT · VITE · TAILWIND CSS",
    short:
      "A ground-up visual redesign of my personal portfolio with a new layout, motion, and theming built to feel intentional and distinct rather than templated.",
    blurb:
      "This redesign rebuilds my portfolio's look and feel from the ground up rather than iterating on the original layout. The focus is entirely visual and interaction-level: a new page layout and information hierarchy, custom motion and micro-interactions in place of static sections, and a refreshed color and type theme meant to feel considered rather than like a default component-library look. It's still built on React, TypeScript, Vite, and Tailwind CSS, but the emphasis is on design craft — how the site looks, moves, and feels to scroll through — not on new features or content.",
    bullets: [
      "Reworked page layout and visual hierarchy across every section (hero, about, projects, resume, contact)",
      "Added custom motion and micro-interactions in place of static, purely CSS-driven sections",
      "Refreshed color palette, typography, and overall visual theme for a more distinctive brand feel",
      "Kept the same React, TypeScript, Vite, and Tailwind CSS foundation while rebuilding the UI layer on top of it",
    ],
    stats: [
      ["SCOPE", "Ground-up visual overhaul"],
      ["NEW", "Custom motion & micro-interactions"],
      ["THEME", "Refreshed colour & type system"],
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Router"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/sunnoah.ca"],
      ["Deployment", "https://sunnoah.ca"]
    ],
    img: "",
  },
  {
    id: "redact",
    name: "Redact",
    year: "2026",
    cat: "software",
    kicker: "COMPUTER VISION · FASTAPI",
    meta: "REACT · PYTHON · DOCKER",
    short:
      "A web app that blurs faces in uploaded video automatically, built as a containerized full-stack pipeline with an async job system.",
    blurb:
      "Redact is a video face-blurring tool: users upload a video, a Python processing pipeline detects and blurs faces frame by frame, and the result is served back through a React/TypeScript frontend. The backend runs an async job queue (jobs.py) around the detection/blur pipeline so long-running video processing doesn't block the API, with storage and schema layers to track upload and job state. The whole stack is containerized with Docker and has a GitHub Actions workflow for deploying the frontend.",
    bullets: [
      "Full video face-detection and blurring pipeline served through a Python API",
      "Async job system (jobs.py) to handle long-running video processing without blocking requests",
      "React + TypeScript + Vite frontend with TanStack Query and React Router",
      "Dockerized backend with a GitHub Actions workflow for automated frontend deployment",
    ],
    stats: [
      ["FRONTEND", "React 19 + Vite"],
      ["BACKEND", "Python API"],
      ["DEPLOYMENT", "Docker + GitHub Actions"],
    ],
    stack: ["Python", "React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Docker", "GitHub Actions"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/Redact"],
      ["Deployment", "https://redact.sunnoah.ca"]
    ],
    img: "",
  },
  {
    id: "autofleet",
    name: "AutoFleet",
    year: "2026",
    cat: "robotics",
    kicker: "MULTI-ROBOT · ESP32",
    meta: "ARDUINO/PRIZM · ESP32 · PYTHON TELEMETRY & CONTROL",
    short:
      "A starter fleet-robotics platform coordinating multiple mobile robots with live telemetry, waypoint paths, and safety behaviors in a shared workspace.",
    blurb:
      "TIC AutoFleet is a small-scale autonomous fleet testbed built for a robotics hackathon track focused on coordinating multiple mobile robots — not just getting one robot to move, but preventing collisions, arbitrating tasks, and giving operators visibility into what the fleet is doing. It pairs TETRIX PRIZM Arduino firmware (with a wireless ESP32 variant) for robot-side control, odometry, and ultrasonic obstacle sensing with a Python central arbiter that manages robot connections, a Tkinter/Matplotlib telemetry dashboard, and grid-based coordinated path planning for a 4m x 4m arena represented at 10cm resolution.",
    bullets: [
      "Central arbiter (Python/Tkinter) manages multiple robot connections and displays live telemetry",
      "Grid-based coordinated path planning for a 4m x 4m arena at 10cm resolution, supporting synchronized multi-robot traverses",
      "TETRIX PRIZM Arduino firmware for manual control, waypoint execution, and ultrasonic obstacle sensing",
      "Wireless robot control variant over ESP32 in addition to serial/USB",
      "Shared newline-delimited JSON messaging protocol for telemetry, path assignment, and pause/resume/stop/gripper commands",
    ],
    stats: [
      ["PLANNER", "space-time A*"],
      ["ROBOT FIRMWARE", "PRIZM + ESP32"],
      ["TRANSPORT", "TCP / UART"],
    ],
    stack: ["Arduino (C++)", "TETRIX PRIZM", "ESP32", "Python", "Tkinter", "Matplotlib", "TCP/Serial messaging"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/TIC_AutoFleet"],
    ],
    img: "autofleet_robot.jpg",
  },
  {
    id: "signal",
    name: "SIGNAL",
    year: "2026",
    cat: "software",
    kicker: "LLM AGENTS · FASTAPI",
    meta: "CLAUDE TOOL-USE AGENT · FASTAPI · SSE DASHBOARD",
    short: "An autonomous Claude agent plays a stranded radio operator, tuning across a noisy 40-channel spectrum to piece together rescue coordinates before power runs out.",
    blurb:
      "SIGNAL is an agent demo built around attention and information synthesis rather than navigation. The agent is dropped into a simulated 40-channel radio spectrum full of static, false leads, and contradicting fragments, and must tune, scan, and cross-reference signals to reconstruct rescue coordinates before a depleting power budget runs out. It's built as three cleanly separated layers — a simulation kernel, a Claude tool-use agent harness, and a FastAPI/SSE dashboard — and models real robotics problems like sensor fusion and acting under uncertainty. It ships with three scenarios of increasing difficulty, 54 unit tests, and a scoring system based on coordinate accuracy.",
    bullets: [
      "Agent uses Claude's native tool-use (function calling) with a validated action space: tune, scan, replay, cross_reference, think, broadcast",
      "Three-layer architecture (simulation kernel, agent harness, FastAPI/SSE presentation) with no cross-layer coupling",
      "Live Cold-War-styled dashboard streams spectrum activity, signal logs, and the agent's reasoning in real time via SSE",
      "Three scenarios (Easy/Medium/Hard) including a 5-hop relay-chain puzzle with no direct coordinates",
      "Broadcast guard prevents the agent from answering with incomplete data, and prompt caching keeps the static system prompt cheap across long episodes",
      "54 unit tests covering the simulation kernel and scoring logic",
    ],
    stats: [
      ["SCENARIOS", "3"],
      ["TRANSPORT", "FastAPI / SSE"],
      ["UNIT TESTS", "54"],
    ],
    stack: ["Python", "Anthropic API (Claude, tool use)", "FastAPI", "Server-Sent Events", "PyYAML", "pytest"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/Signal"],
      ["Live demo", ""],
    ],
    img: "",
  },
  {
    id: "decks",
    name: "Decks",
    year: "2026",
    cat: "embedded",
    kicker: "PWM · PICO",
    meta: "RASPBERRY PI PICO · PWM MOTOR CONTROL · C",
    short: "A hardware card-shuffling device driven by a Raspberry Pi Pico, using PWM-controlled motors to feed and mix a deck automatically.",
    blurb:
      "Decks is an embedded hardware project that automates shuffling a deck of cards using a Raspberry Pi Pico for motor control. It drives a DC motor through PWM at a tuned frequency and duty cycle to move cards through the shuffling mechanism, with dedicated forward/reverse/stop routines and a CMake-based build targeting the Pico SDK.",
    bullets: [
      "PWM-based DC motor control tuned for consistent card feed speed",
      "Forward, reverse, and stop motor routines for mechanical shuffling motion",
      "Built on the Raspberry Pi Pico SDK with a CMake build system",
    ],
    stats: [
      ["MCU", "RPi Pico"],
      ["CONTROL", "PWM Motor Driver"],
      ["FIRMWARE", "C"],
    ],
    stack: ["C", "Raspberry Pi Pico", "OnShape", "3D Printing", "PWM Motor Control"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/CardShuffler"],
    ],
    img: "",
  },
  {
    id: "citywatch",
    name: "CityWatch",
    year: "2026",
    cat: "software",
    kicker: "COMPUTER VISION · RNN",
    meta: "REACT NATIVE · NODE.JS · COMPUTER VISION · POSTGIS",
    short: "A mobile-first platform where residents report potholes and infrastructure damage, which a CV pipeline classifies and turns into predictive risk heatmaps for cities.",
    blurb:
      "CityWatch helps cities and communities detect, visualize, and prioritize infrastructure damage using mobile reports, computer vision, and geospatial data. Residents submit a photo and GPS location through an Expo/React Native app; a Python CV worker classifies the issue type and severity; and a Node.js/Express backend persists everything to a PostGIS-enabled Supabase database. An aggregation job rolls reports up into grid-based heatmap tiles with short-term risk predictions (30/90/365 days), which are rendered on an interactive Mapbox map to help maintenance teams prioritize where to go next.",
    bullets: [
      "Mobile reporting flow (photo + GPS) built with Expo React Native and TypeScript",
      "Python CV pipeline (Keras/TensorFlow, scikit-learn) classifies damage type and severity from photos",
      "Geospatial storage and querying via Supabase Postgres with PostGIS",
      "Interactive Mapbox heatmap with 30/90/365-day predictive risk scoring",
      "Auth0-based authentication and a full REST API for reports, stats, and heatmap tiles",
    ],
    stats: [
      ["FRONTEND", "Expo React Native"],
      ["CV PIPELINE", "Keras / TensorFlow"],
      ["DATABASE", "PostGIS on Supabase"],
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Express",
      "Python",
      "TensorFlow/Keras",
      "scikit-learn",
      "Supabase",
      "PostGIS",
      "Mapbox",
      "Auth0",
    ],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/CityWatch"],
    ],
    img: "citywatch.png",
  },
  {
    id: "paperfolder",
    name: "Paper Folder Robot",
    year: "2025",
    cat: "robotics",
    kicker: "Embedded C++ · PID CONTROL",
    meta: "MTE100 FINAL PROJECT · VEX IQ · PID CONTROL",
    short: "A mechatronic robot that feeds and folds paper automatically, built as a final project combining motor control, sensing, and a hard-stop feed system.",
    blurb:
      "Paper Folder Robot is a mechatronics final project (MTE 100) that automates paper folding end to end: a feeder pulls in a sheet, rollers guide it through the fold mechanism, and a hard-stop system combined with PID motor control ensures each fold lands accurately and repeatably. The embedded C++ codebase is organized into clean modules for the feeder, rollers, hard-stop detection, PID control, and motor driving.",
    bullets: [
      "Modular embedded C++ design with dedicated feeder, roller, hard-stop, and PID controller components",
      "Closed-loop PID control for accurate, repeatable fold positioning",
      "Hard-stop sensing to detect paper position and trigger fold actions",
      "Built and tested as a physical mechatronic system for a university course final project",
    ],
    stats: [
      ["COURSE", "MTE100"],
      ["LANGUAGE", "C++"],
      ["CONTROL", "PID"],
    ],
    stack: ["C++", "VEX (V5)", "PID control", "Embedded systems"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/Paper-Folder-Bot"],
      ["Demo video", "https://youtu.be/K6T1ojHrifk?si=xwwbdwTEUAyVA40S"],
    ],
    img: "paperfolder.jpg",
  },
  {
    id: "nav",
    name: "Autonomous Navigation System",
    year: "2025",
    cat: "robotics",
    kicker: "LIDAR · PURE PURSUIT",
    meta: "C++ · ROS2 · DOCKER · PURE PURSUIT CONTROLLER",
    short: "A containerized autonomous-driving software stack simulating a self-driving car's sensor pipeline, with services communicating across a reproducible, cross-platform Docker monorepo.",
    blurb:
      "This project builds out a small autonomous-driving software stack in the style used by WATonomous, a student self-driving car team. The system runs as a set of containerized services — a Gazebo-simulated vehicle and environment, and a pipeline of producer, aggregator, and transformer nodes implemented in both C++ and Python — that pass sensor and processed data between each other the way a real autonomy stack does. Everything runs through Docker for a fully reproducible, cross-platform environment, and Foxglove is used to visualize and debug simulated sensor and vehicle data in real time.",
    bullets: [
      "Containerized, multi-service architecture with Gazebo-simulated vehicle and environment containers",
      "C++ and Python producer/aggregator/transformer nodes modeling a real sensor-processing pipeline",
      "Foxglove integration for live visualization and debugging of simulated sensor and robot data",
      "Fully reproducible, cross-platform development environment built entirely on Docker",
    ],
    stats: [
      ["SIMULATION", "Gazebo + Foxglove"],
      ["PLANNER", "A* + replan"],
      ["CONTROL", "Pure Pursuit"],
    ],
    stack: ["C++", "ROS2", "Docker", "Gazebo", "Foxglove", "LiDAR", "Pure Pursuit", "Odometry"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/wato_asd_training"],
      ["Demo video", "https://youtu.be/CKogSlk9C5I?si=1ZS_dvz-jcXbfBjl"],
    ],
    img: "ans.jpg",
  },
  {
    id: "portfolio-original",
    name: "Personal Portfolio (Original)",
    year: "2026",
    cat: "software",
    kicker: "REACT · TAILWIND",
    meta: "REACT · VITE · TAILWIND CSS",
    short:
      "My original personal portfolio site was a single-page React app showcasing my software, robotics, and engineering projects alongside my resume and contact info.",
    blurb:
      "The original version of my portfolio is a single-page React application built with Vite, TypeScript, and Tailwind CSS, using shadcn/ui and Radix primitives for its component layer. It's organized into a straightforward set of sections (hero, about, projects, resume, and contact) with the resume viewable in-page as well as downloadable as a PDF. The site is deployed to GitHub Pages with a simple build-and-publish workflow.",
    bullets: [
      "Single-page layout with hero, about, projects, resume, and contact sections",
      "Built on shadcn/ui and Radix UI primitives for accessible, consistent components",
      "In-page resume viewer with a direct PDF download link",
      "Deployed to GitHub Pages via an automated build-and-publish script",
    ],
    stats: [
      ["SECTIONS", "6"],
      ["UI COMPONENTS", "shadcn/ui + Radix"],
      ["LAYOUT", "Single-page site"],
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Router"],
    links: [],
    img: "",
  },
  {
    id: "elapse",
    name: "Elapse",
    year: "2025",
    cat: "software",
    kicker: "MOBILE APP · FIREBASE",
    meta: "FLUTTER · FIREBASE · LIVE ON IOS & ANDROID",
    short: "A mobile app that pulls live VRC event and team data so competitors can track standings, rankings, and skills scores on the go.",
    blurb:
      "elapse is a cross-platform mobile app for the VEX Robotics Competition (VRC) community, built with Flutter and shipped to both the App Store and Google Play. It pulls live match, ranking, and skills data from the RobotEvents and VRC Data Analysis APIs so teams can check standings, TrueSkill ratings, and event schedules without digging through spreadsheets. The backend uses Firebase Auth and Firestore for accounts and data sync, and the app is actively maintained with a public Discord for user support and feedback.",
    bullets: [
      "Published to both the Apple App Store and Google Play Store",
      "Integrates the RobotEvents.com and VRC Data Analysis APIs for live event, ranking, and TrueSkill data",
      "Uses Firebase Auth and Firestore for account management and data sync",
      "Token rotation system to avoid API rate limiting across multiple RobotEvents tokens",
      "Active community support via a dedicated Discord server",
    ],
    stats: [
      ["PLATFORMS", "iOS + Android"],
      ["BACKEND", "Firebase"],
      ["DATA SOURCE", "VEX Events API"],
    ],
    stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Cloud Functions", "VEX Events API"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/VexDex"],
    ],
    img: "elapse.png",
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
      ["GitHub repo", "https://github.com/LegendaryArk/VexDex"],
    ],
    img: "",
  },
  {
    id: "arklib",
    name: "ArkLib",
    year: "2025",
    cat: "robotics",
    kicker: "ODOMETRY · MOTION PROFILING",
    meta: "C++ · 5 YEARS OF DEVELOPMENT · VEX V5",
    short: "A custom-built C++ robotics library for VEX V5 covering odometry, motion profiling, PID control, and hardware abstraction. Developed over 5 years and carried across multiple competition teams.",
    blurb:
      "ArkLib is a from-scratch C++ robotics library for the VEX V5 platform, built on top of PROS and okapilib and developed continuously over 5 years across multiple competition teams and seasons. Rather than a one-off competition codebase, it's a reusable framework: a fully object-oriented device layer abstracts motors, motor groups, rotation sensors, optical encoders, and the inertial sensor behind common interfaces, so subsystems and autonomous code can be written against clean APIs instead of raw hardware calls. On top of that sit a full odometry system for continuous field-position tracking, a motion profiling module for smooth autonomous paths, a generic PID controller used throughout the codebase, and a library of math/geometry utilities (poses, points, vectors) that everything else is built on. Subsystem classes (chassis, arm, intake, catapult) are composed from these building blocks, plus an auton selector and logger for competition-day tooling. This snapshot reflects the library's latest version from the 2024-2025 \"High Stakes\" season.",
    bullets: [
      "Fully object-oriented device abstraction layer — motors, motor groups, rotation/optical encoders, and inertial sensors all implement common interfaces",
      "Custom odometry system for continuous, sensor-fused field-position tracking (tracking wheels + inertial)",
      "Motion profiling module for generating smooth, time-optimized autonomous paths",
      "Generic, reusable PID controller shared across drivetrain and subsystem control loops",
      "Math/geometry utility layer (Pose, Point, Vector2D) underpinning odometry and motion planning",
      "Modular subsystem classes (chassis, arm, intake, catapult) plus an auton selector and onboard logger for competition use",
      "In continuous development for 5 years, carried across multiple teams and competition seasons rather than rewritten each year",
    ],
    stats: [
      ["PLATFORM", "VEX V5"],
      ["CORE SYSTEMS", "Odometry, motion profiling, PID control"],
      ["IN DEVELOPMENT", "5 years"],
    ],
    stack: ["C++", "OOP", "VEX V5", "Git", "PID Control", "Odometry", "Motion Profiling", "Kinematics", "Motion Algorithms"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/VRC2425-HighStakes"],
    ],
    img: "checkmate.png",
  },
  {
    id: "mentorful",
    name: "Mentorful",
    year: "2025",
    cat: "software",
    kicker: "FLUTTER · GEMINI API",
    meta: "HACKATHON PROJECT · FLUTTER · FASTAPI · GEMINI API",
    short: "A mobile app that helps people recovering from addiction rebuild daily routines and life skills through scheduling accountability and guided lessons.",
    blurb:
      "Nearly half of people relapse after rehab, and reintegration support for recovering adults is often thin. Mentorful is a hackathon project aimed at closing that gap with two core features: a personalized reminder and scoring system that checks users' Google Calendar to confirm they're following their recovery schedule, and a structured lesson library covering life skills like cooking, personal hygiene, and time management. The app is built with Flutter on the frontend and FastAPI on the backend, using the Gemini and Google Calendar APIs.",
    bullets: [
      "Google Calendar integration verifies users are following their recovery schedule day to day",
      "Categorized scoring system tracks progress across areas like cleanliness and routine adherence",
      "Structured lesson library teaches practical life skills (cooking, hygiene, time management)",
      "Flutter mobile frontend backed by a FastAPI service",
      "Built with Gemini and Google Calendar APIs within a hackathon time limit",
    ],
    stats: [
      ["FORMAT", "Hackathon build"],
      ["FRONTEND", "Flutter"],
      ["APIS", "Gemini + Google Calendar"],
    ],
    stack: ["Flutter", "Dart", "FastAPI", "Python", "Gemini API", "Google Calendar API"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/Mentorful"],
    ],
    img: "mentorful.png",
  },
  {
    id: "boggle",
    name: "Boggle",
    year: "2024",
    cat: "software",
    kicker: "JAVA · GAME",
    meta: "JAVA · ICS4U FINAL PROJECT · GAME DEVELOPMENT",
    short: "A complete desktop Boggle game in Java with a solving AI, multiple game modes, custom UI screens, sound, and a full settings/guide system.",
    blurb:
      "Boggle is a from-scratch Java implementation of the classic word-search game, built as the final Independent Study Project for a Grade 12 computer science course. Beyond the core board and dictionary-backed word validation, it includes a word-finding AI opponent for single-player mode, player-vs-player and player-vs-AI modes, a full custom UI with hand-drawn assets, sound and music, a scoring breakdown, and an in-app guide explaining rules and scoring.",
    bullets: [
      "Custom AI opponent that solves the board and competes against the player",
      "Player-vs-player and player-vs-AI game modes with a full menu and settings system",
      "Dictionary-backed word validation using a bundled word list",
      "Custom UI screens, sound effects, and background music built entirely in Java",
      "In-game guide and points-breakdown screens explaining rules and scoring",
      "Built collaboratively as a 4-person group final project",
    ],
    stats: [
      ["LANGUAGE", "Java"],
      ["TEAM SIZE", "4"],
      ["GAME MODES", "PvP + PvAI"],
    ],
    stack: ["Java", "Java2D/Swing"],
    links: [
      ["GitHub repo", "https://github.com/LegendaryArk/Boggle"],
    ],
    img: "boggle.png",
  },
];
