import { Outlet } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useParallax } from "../hooks/useParallax";
import Nav from "./Nav";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";

export default function Layout() {
  useScrollReveal();
  useParallax();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <LoadingScreen />
      <Nav />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
