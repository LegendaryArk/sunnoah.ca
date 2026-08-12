import Hero from "../components/Hero";
import Experience from "../components/Experience";
import FeaturedProjects from "../components/FeaturedProjects";
import Education from "../components/Education";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <div style={{ animation: "pageIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Education />
      <Skills />
    </div>
  );
}
