import { useEffect, useRef } from "react";
import { skillsAnimation } from "../animations/skillsgsap";

// Icons
import { FaPython, FaReact, FaGitAlt } from "react-icons/fa";
import {
  SiFastapi,
  SiMongodb,
  SiDjango,
  SiFlask,
  SiMysql,
  SiJavascript,
} from "react-icons/si";

export default function Skills() {
  const containerRef = useRef(null);

  const skills = [
    { name: "Python", icon: <FaPython /> },
    { name: "React", icon: <FaReact /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Flask", icon: <SiFlask /> },
    { name: "Django", icon: <SiDjango /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Git", icon: <FaGitAlt /> },
  ];

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   const ctx = skillsAnimation(containerRef.current);

  //   return () => ctx.revert(); // ✅ cleanup
  // }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 text-center px-4"
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl mb-12 font-bold tracking-wide">
        Skills
      </h2>

      {/* Skills Grid */}
      <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
        {skills.map((s, i) => (
          <div
            key={i}
            className="skill flex items-center gap-3 px-6 py-3 
            bg-white/10 backdrop-blur-md border border-white/10 
            rounded-full hover:bg-cyan-400/20 
            hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-sm md:text-base">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}