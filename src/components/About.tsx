import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "Languages and Frameworks",
      items: ["C/C++", "Python", "Java", "ROS2"],
    },
    {
      category: "Control Systems",
      items: [
        "PID Control",
        "State Machines",
        "FreeRTOS",
        "Sensors/Actuators",
      ],
    },
    {
      category: "Development Tools",
      items: ["Git", "Docker", "Solidworks", "AutoCAD"],
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 bg-gradient-to-b from-background/90 via-background to-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg">
              <p className="leading-relaxed">Hello! 👋</p>
              <p className="leading-relaxed">
                My name is Noah Sun, a first year mechatronics engineering
                student at the University of Waterloo with a passion for
                engineering, software development, and problem-solving.
              </p>
              <p className="leading-relaxed">
                As the captain of my VEX robotics team, I've led my peers
                through international competitions, designing motion algorithms,
                managing limited resources, and applying innovative solutions
                under pressure. I've also worked on collaborative software
                projects like a Boggle game with an AI opponent, where I led a
                team of four in building a polished, integrated product.
              </p>
              <p className="leading-relaxed">
                Most recently, I co-founded and helped develop Elapse, a mobile
                app designed to improve the experience for VEX Robotics teams,
                achieving over 3500 downloads.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((skillGroup) => (
              <Card
                key={skillGroup.category}
                className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300"
              >
                <h4 className="font-semibold text-primary mb-3">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-sm text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
            <div className="flex flex-wrap justify-center items-center p-2">
              <Button
                variant="hero"
                size="sm"
                className="text-xs sm:text-sm w-full whitespace-normal leading-tight py-4 sm:py-6 px-4 min-h-[3.5rem] sm:min-h-[2.5rem]"
                onClick={() =>
                  document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="ml-1">Check out my Résumé!</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
