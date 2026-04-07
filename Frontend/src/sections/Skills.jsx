import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPython, FaReact, FaGitAlt } from "react-icons/fa";
import {
  SiFastapi,
  SiMongodb,
  SiDjango,
  SiFlask,
  SiMysql,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiGreensock,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    // 1. Header & Label Intro
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    introTl
      .from(".skills-label", { x: -30, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".skills-title", { 
        y: 50, 
        opacity: 0, 
        rotateX: -20, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.8")
      .from(".skills-line", { scaleX: 0, transformOrigin: "left", duration: 1.5, ease: "expo.inOut" }, "-=1");

    // 2. Cinematic Card Batching (The Working Animation)
    ScrollTrigger.batch(".skill-card", {
      start: "top 90%",
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.9, 
            filter: "blur(10px)", 
            rotateX: -15 
          }, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            filter: "blur(0px)", 
            rotateX: 0, 
            stagger: 0.1, 
            duration: 1.2, 
            ease: "expo.out",
            overwrite: true 
          }
        );
      },
      onLeaveBack: (elements) => {
        gsap.set(elements, { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" });
      }
    });

    // 3. Featured Glow & Parallax Background
    gsap.to(".featured-glow", {
      opacity: 0.5,
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".bg-orb", {
      y: -150,
      x: 50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      
      {/* Background Parallax Lighting */}
      <div className="bg-orb absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="bg-orb absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Label */}
        <div className="skills-label flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-amber-500 font-bold">02 / EXPERTISE</span>
          <div className="skills-line h-px w-24 bg-white/10" />
        </div>

        {/* Cinematic Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="skills-title text-6xl md:text-8xl font-light tracking-tighter text-white leading-none">
            Tech <br /> <span className="italic font-serif text-amber-500">Arsenal.</span>
          </h2>
          <p className="skills-reveal max-w-xs text-white/30 font-mono text-[10px] uppercase tracking-[0.3em] leading-loose">
            Building robust solutions with a modern full-stack ecosystem.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 perspective-1000">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className={`skill-card group relative p-8 rounded-4xl border transition-all duration-700 
                ${skill.featured 
                  ? "col-span-2 md:col-span-2 bg-amber-500/3 border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.05)]" 
                  : "bg-white/2 border-white/5 hover:bg-white/6 hover:border-white/20"
                }`}
            >
              {/* Featured Ambient Glow */}
              {skill.featured && (
                <div className="featured-glow absolute inset-0 bg-amber-500/10 blur-2xl opacity-20 pointer-events-none rounded-full" />
              )}

              <div className="relative z-10 h-full flex flex-col justify-between gap-12">
                <div className={`text-4xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12
                  ${skill.featured ? "text-amber-500" : "text-white/30 group-hover:text-white"}
                `}>
                  {skill.icon}
                </div>

                <div>
                  <h3 className="text-white font-medium text-base tracking-tight mb-1 group-hover:text-amber-400 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-white/50">
                    {skill.tag}
                  </span>
                </div>
              </div>

              {/* Unique Interactive Hover Border */}
              <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/30 rounded-4xl transition-all duration-1000 pointer-events-none scale-110 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}