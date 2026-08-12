import { Outlet } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useParallax } from "../hooks/useParallax";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  useScrollReveal();
  useParallax();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
