import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"; // Add Link for navigation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectList({ isHomePage = false }) {
  const [projects, setProjects] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Chitresh2414/repos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .filter(repo => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Logic: If on home page, show 3. If not, show all.
        const limit = isHomePage ? 3 : sorted.length;

        const mapped = sorted.slice(0, limit).map((repo, index) => ({
          title: repo.name.replace(/-/g, " "),
          desc: repo.description || "Architecting digital solutions with precision and modern tech stacks.",
          tags: [repo.language || "Full Stack", "Dev"],
          href: repo.html_url,
          live: repo.homepage || repo.html_url,
          num: String(index + 1).padStart(2, "0"),
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("GitHub fetch error:", err));
  }, [isHomePage]);

  useGSAP(() => {
    if (projects.length > 0) {
      // Header Animation
      gsap.from(".project-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Cards Batch Reveal
      ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 1, ease: "expo.out", overwrite: true }
          );
        }
      });
    }
  }, [projects]);

  if (!projects.length) return <div className="h-40 flex items-center justify-center text-white/20">Loading...</div>;

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-6xl mx-auto relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div>
          <div className="project-reveal flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-amber-500 font-bold">
              {isHomePage ? "04 / Featured" : "Archive / All Works"}
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          <h2 className="project-reveal text-5xl md:text-7xl font-light tracking-tighter text-white leading-none">
            Selected <span className="italic font-serif text-amber-500">Works.</span>
          </h2>
        </div>

        {/* --- VIEW ALL BUTTON (Only shows on Home Page) --- */}
        {isHomePage && (
          <Link 
            to="/projects" 
            className="project-reveal group flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 hover:text-amber-500 transition-all duration-500"
          >
            Explore Full Archive
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-500 group-hover:rotate-45 transition-all duration-500">
               <FiArrowUpRight size={14} />
            </div>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="project-card group relative flex flex-col justify-between bg-white/2 border border-white/5 rounded-4xl p-8 hover:bg-white/5 hover:border-amber-500/20 transition-all duration-700"
          >
            <div className="relative z-10">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 mb-6 block uppercase">{p.num}</span>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4 group-hover:text-amber-400 transition-colors duration-500 capitalize">{p.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-10 font-light italic h-20 overflow-hidden line-clamp-3">"{p.desc}"</p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex gap-4">
                <a href={p.href} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors"><FiGithub size={16} /></a>
                <a href={p.live} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors"><FiExternalLink size={16} /></a>
              </div>
              <div className="flex gap-2">
                {p.tags.slice(0, 1).map(tag => (
                  <span key={tag} className="text-[9px] font-mono text-amber-500/40 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}