export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    label: "LANGUAGES",
    items: ["C/C++", "Python", "Java", "JavaScript", "TypeScript", "Dart", "MicroPython"],
  },
  {
    label: "ROBOTICS / CONTROLS",
    items: ["ROS2", "RTOS", "PID Control", "Motor Control", "Sensor Fusion", "Kinematics", "Foxglove"],
  },
  {
    label: "EMBEDDED / HARDWARE",
    items: [
      "STM32",
      "Raspberry Pi",
      "NVIDIA Jetson",
      "Arduino",
      "UART",
      "SPI",
      "Soldering",
      "SolidWorks",
      "3D Printing",
    ],
  },
  {
    label: "AI / SOFTWARE",
    items: ["OpenCV", "TensorFlow", "Claude API", "FastAPI", "Express.js", "Node.js", "React Native", "Flutter"],
  },
  {
    label: "DATA / DEVOPS",
    items: ["PostgreSQL", "MySQL", "Azure", "Firebase", "Pandas", "Git", "Docker", "Linux", "GitHub Actions"],
  },
];
