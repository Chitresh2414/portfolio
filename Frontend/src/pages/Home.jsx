import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import ProjectList from "../sections/projectList";
import Footer from "../sections/Footer";
import Experience from "../sections/Experience";

export default function Home() {
  return (
    <main className="text-white">
      <Hero />
      <Skills />
      <Experience />
      <ProjectList />
      <Footer />
    </main>
  );
}