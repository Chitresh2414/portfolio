import { useEffect, useState, useRef } from "react";
import { projectAnimation } from "../animations/gsapAnimations";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const cardsRef = useRef([]);

  // Fetch GitHub repos dynamically
  useEffect(() => {
    fetch("https://api.github.com/users/Chitresh2414/repos")
      .then((res) => res.json())
      .then((data) => {
        // Sort by most recently updated
        const sorted = data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        // Map to the format we need
        const mapped = sorted.map((repo, index) => ({
          title: repo.name,
          desc: repo.description || "No description available",
          tags: ["GitHub", "Code"], // you can customize or fetch languages
          href: repo.html_url,
          num: String(index + 1).padStart(2, "0"),
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("GitHub fetch error:", err));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (cardsRef.current.length) {
      projectAnimation(cardsRef.current);
    }
  }, [projects]);

  if (!projects.length) {
    return (
      <section className="py-32 px-6 max-w-5xl mx-auto text-center text-white/50">
        Loading projects...
      </section>
    );
  }

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-amber-400/60">
          04
        </span>
        <div className="w-8 h-px bg-amber-400/30" />
        <span className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-white/30">
          work
        </span>
      </div>

      {/* Header */}
      <div className="flex items-baseline gap-6 mb-12">
        <h2 className="font-['Syne'] text-4xl md:text-5xl font-bold tracking-tight shrink-0">
          Projects
        </h2>
        <div className="flex-1 h-px bg-white/5" />
        <span className="font-['DM_Mono'] text-xs text-white/20 tracking-widest shrink-0">
          {String(projects.length).padStart(2, "0")} total
        </span>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="card group relative flex flex-col justify-between bg-white/3 border border-white/8 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:border-white/15 hover:-translate-y-1 overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-400/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative z-10">
              {/* Number */}
              <span className="font-['DM_Mono'] text-[10px] tracking-widest text-amber-400/40 mb-4 block">
                {p.num}
              </span>

              {/* Title */}
              <h3 className="font-['Syne'] text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-white/35 text-sm leading-relaxed mb-5">{p.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-['DM_Mono'] text-[10px] tracking-wide text-white/30 border border-white/8 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-white/5">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-['DM_Mono'] text-[10px] tracking-widest uppercase text-white/30 hover:text-amber-400 transition-colors duration-300"
              >
                <FiGithub size={12} /> Code
              </a>

              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-['DM_Mono'] text-[10px] tracking-widest uppercase text-white/30 hover:text-amber-400 transition-colors duration-300"
              >
                <FiExternalLink size={12} /> Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}