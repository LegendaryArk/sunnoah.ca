import { useEffect } from "react";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import FeaturedProjects from "../components/FeaturedProjects";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import { consumeHomeScroll } from "../lib/scrollMemory";

export default function Home() {
  useEffect(() => {
    const y = consumeHomeScroll();
    if (y !== null) window.scrollTo(0, y);
  }, []);

  return (
    <div style={{ animation: "pageIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Education />
      <Skills />
      <Resume />
      <Contact />
    </div>
  );
}
