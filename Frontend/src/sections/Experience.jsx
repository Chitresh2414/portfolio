import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2026 March — Present",
    role: "Python Developer",
    type: "Internship",
    company: "PAPASIDDHI IT SERVICES PVT LTD",
    desc: "Architecting robust backend services using FastAPI and Django. Implementing RESTful APIs and optimizing database interactions for high-performance application scaling.",
  },
  {
    year: "2025 August — 2026 February",
    role: "Full Stack Developer",
    type: "Internship",
    company: "Cravita Technologies India Pvt Ltd",
    desc: "Engineered high-performance user interfaces by integrating GSAP animations and React. Focused on frontend rendering cycles and core web vitals optimization.",
  }
];

export default function Experience() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Reveal the Vertical Line (Drawing effect)
    gsap.from(".experience-line", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 2,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: ".experience-container",
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    // 2. Animate Experience Cards
    const items = gsap.utils.toArray(".experience-item");
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 60,
        rotateX: -15,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });

    // 3. Header Animation
    gsap.from(".exp-header", {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[#030303] overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-24">
          <div className="exp-header flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-amber-500 font-bold">03 / History</span>
            <div className="h-px w-12 bg-amber-500/30" />
          </div>
          <h2 className="exp-header text-6xl md:text-8xl font-light tracking-tighter text-white leading-none">
            Professional <br /> <span className="italic font-serif text-amber-500">Journey.</span>
          </h2>
        </div>

        <div className="experience-container relative">
          
          {/* The Animated Vertical Line */}
          <div className="experience-line absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-px h-full bg-linear-to-b from-amber-500 via-amber-500/20 to-transparent" />

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`experience-item relative flex flex-col md:flex-row items-center w-full ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Year Marker (Side View) */}
                <div className="hidden md:flex w-1/2 px-16 justify-start items-center">
                   <div className={`${i % 2 === 0 ? "text-right w-full" : "text-left w-full"}`}>
                      <span className="font-mono text-amber-500/40 text-[10px] uppercase tracking-[0.4em] mb-2 block">{exp.type}</span>
                      <span className="text-xl font-light text-white/60 tracking-tight italic font-serif">{exp.year}</span>
                   </div>
                </div>

                {/* Animated Connector Dot */}
                <div className="absolute -left-1 md:left-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-10" />

                {/* The Experience Card */}
                <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-16">
                  <div className="group relative p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl hover:bg-white/5 hover:border-amber-500/30 transition-all duration-700">
                    
                    <span className="md:hidden font-mono text-amber-500/60 text-[9px] tracking-widest uppercase mb-4 block">
                      {exp.year}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1 group-hover:text-amber-400 transition-colors duration-500">
                      {exp.role}
                    </h3>
                    
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
                      <span className="w-1 h-1 bg-amber-500 rounded-full" /> {exp.company}
                    </p>
                    
                    <p className="text-white/50 text-sm leading-relaxed font-light tracking-wide italic">
                      "{exp.desc}"
                    </p>

                    {/* Subtle Internal Highlight */}
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="w-8 h-8 rounded-full border border-amber-500/20 flex items-center justify-center">
                          <div className="w-1 h-1 bg-amber-500 rounded-full" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}