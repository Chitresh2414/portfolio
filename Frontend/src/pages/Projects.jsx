import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiArrowLeft } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const container = useRef(null);

  useEffect(() => {
    // Fetching all repos for the dedicated page
    fetch("https://api.github.com/users/Chitresh2414/repos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .filter(repo => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const mapped = sorted.map((repo, index) => ({
          title: repo.name.replace(/-/g, " "),
          desc: repo.description || "Exploration of modern full-stack architecture and scalable logic.",
          tags: [repo.language || "Software", "v1.0"],
          href: repo.html_url,
          live: repo.homepage || repo.html_url,
          num: String(index + 1).padStart(2, "0"),
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  useGSAP(() => {
    if (projects.length > 0) {
      const tl = gsap.timeline();

      tl.from(".page-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(".back-link", {
        x: -20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.8");

      ScrollTrigger.batch(".project-card-full", {
        start: "top 90%",
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.8, ease: "power3.out" }
          );
        }
      });
    }
  }, [projects]);

  return (
    <main ref={container} className="min-h-screen bg-[#030303] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Lighting Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation / Header */}
        <div className="mb-20">
          <Link to="/" className="back-link group flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 hover:text-amber-500 transition-all duration-500 mb-12 w-fit">
            <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" size={14} />
            Back to Studio
          </Link>

          <h1 className="page-title text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-8">
            The <br /> <span className="italic font-serif text-amber-500 font-normal">Archive.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between border-b border-white/10 pb-8">
            <p className="max-w-md text-white/40 font-light text-lg">
              A chronological collection of open-source contributions, personal experiments, and full-stack architecture.
            </p>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20">
              Total Repositories: {projects.length}
            </span>
          </div>
        </div>

        {/* Project Grid - Dynamic and Responsive */}
        {!projects.length ? (
           <div className="h-64 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-white/20">
             Indexing Repositories...
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((p, i) => (
              <div key={i} className="project-card-full group relative flex flex-col justify-between border-l border-white/5 pl-8 py-4 hover:border-amber-500/40 transition-all duration-700">
                
                <div className="relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.4em] text-amber-500/30 mb-6 block uppercase">
                    Index {p.num}
                  </span>

                  <h3 className="text-3xl font-light tracking-tight text-white mb-4 group-hover:text-amber-400 transition-colors duration-500 capitalize leading-tight">
                    {p.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed mb-8 font-light line-clamp-3">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {p.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] tracking-widest uppercase text-white/20 border border-white/10 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-6 pt-6">
                  <a href={p.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">
                    <FiGithub size={14} className="text-amber-500/50" /> Repo
                  </a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">
                    <FiExternalLink size={14} className="text-amber-500/50" /> View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
};

export default Projects;