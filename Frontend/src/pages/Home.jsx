import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import ProjectList from "../sections/projectList";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <main className="text-white">
      <Hero />
      <Skills />
      <ProjectList />
      <Footer />
    </main>
  );
}