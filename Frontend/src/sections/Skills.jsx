import { useLayoutEffect, useRef } from "react";
import { skillsAnimation } from "../animations/skillsgsap";
import { FaPython, FaReact, FaGitAlt } from "react-icons/fa";
import {
  SiFastapi,
  SiMongodb,
  SiDjango,
  SiFlask,
  SiMysql,
  SiJavascript,
  SiTailwindcss, // Added
  SiNodedotjs,   // Added
  SiGreensock,   // Changed SiGsap to SiGreensock (standard react-icon name)
} from "react-icons/si";

const skills = [
  { name: "Python", icon: <FaPython />, tag: "core lang", featured: true },
  { name: "React", icon: <FaReact />, tag: "frontend", featured: false },
  { name: "FastAPI", icon: <SiFastapi />, tag: "backend", featured: false },
  { name: "MongoDB", icon: <SiMongodb />, tag: "database", featured: false },
  { name: "Django", icon: <SiDjango />, tag: "framework", featured: false },
  { name: "Flask", icon: <SiFlask />, tag: "micro-fw", featured: false },
  { name: "JavaScript", icon: <SiJavascript />, tag: "web lang", featured: false },
  { name: "MySQL", icon: <SiMysql />, tag: "database", featured: false },
  { name: "Git", icon: <FaGitAlt />, tag: "version ctrl", featured: false },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, tag: "css framework", featured: false },
  { name: "Node.js", icon: <SiNodedotjs />, tag: "backend", featured: false },
  { name: "GSAP", icon: <SiGreensock />, tag: "animation lib", featured: false },
];

export default function Skills() {
  const containerRef = useRef(null);

  // useLayoutEffect(() => {
  //   if (!containerRef.current) return;
  //   const ctx = skillsAnimation(containerRef.current);
  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-4 opacity-50">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400">
          02
        </span>
        <div className="w-8 h-px bg-amber-400/30" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white">
          expertise
        </span>
      </div>

      {/* Header */}
      <div className="flex items-baseline gap-6 mb-12">
        <h2 className="skills-heading font-['Syne'] text-4xl md:text-5xl font-bold tracking-tight shrink-0 text-white">
          Skills
        </h2>
        <div className="skills-line flex-1 h-px bg-white/10" />
        <span className="font-mono text-xs text-white/20 tracking-widest shrink-0">
          {skills.length} tools
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Featured skill */}
        <div className="skill featured col-span-2 flex flex-row items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer group relative overflow-hidden">
          <span className="text-4xl text-amber-400 group-hover:scale-110 transition-transform duration-500">
            {skills[0].icon}
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-sm font-medium tracking-widest uppercase text-white">
              {skills[0].name}
            </p>
            <span className="font-mono text-[10px] tracking-wide text-amber-400/60 border border-amber-400/20 rounded-full px-3 py-0.5 w-fit bg-amber-400/5">
              {skills[0].tag}
            </span>
          </div>
        </div>

        {/* Remaining skills */}
        {skills.slice(1).map((s, i) => (
          <div
            key={i}
            className="skill flex flex-col gap-4 bg-white/5 border border-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <span className="text-2xl text-white/40 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500">
              {s.icon}
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-white/70">
                {s.name}
              </p>
              <span className="font-mono text-[9px] tracking-wide text-white/20 border border-white/10 rounded-full px-2 py-0.5 w-fit">
                {s.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}