import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import ProjectList from "../sections/projectList";
import Footer from "../sections/Footer";
import Experience from "../sections/Experience";

export default function Home() {
  return (
    <main className="bg-[#030303] text-white selection:bg-amber-500/30 selection:text-amber-500">
      {/* 00 / Intro */}
      <Hero />

      {/* 01 / Expertise - Your tech arsenal */}
      <Skills />

      {/* 02 / History - Your professional journey */}
      <Experience />

      {/* 03 / Archive - Featured projects only (3 cards) */}
      <ProjectList isHomePage={true} />

      {/* 04 / Outro - Contact and links */}
      <Footer />
    </main>
  );
}