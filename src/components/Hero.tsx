import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000">
          Noah Sun
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-in slide-in-from-bottom-4 duration-1000 delay-200 tracking-wide">
          Mechatronics Engineering Student at University of Waterloo
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              window.open(
                "https://github.com/LegendaryArk",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/sunnoah",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() => window.open("mailto:nn2sun@uwaterloo.ca")}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <FileText className="h-5 w-5" />
          </Button>
        </div>

        {/* Scroll indicator */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToSection("about")}
          className="animate-bounce text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse delay-500" />
    </section>
  );
};

export default Hero;
