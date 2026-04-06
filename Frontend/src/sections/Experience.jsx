import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {useGSAP} from"@gsap/react";

const experiences = [
  {
    year: "2026 - Present",
    role: "Python Developer - Intern",
    company: "PAPASIDDHI IT SERVICES PVT LTD",
    desc: "Architecting robust backend services using Python frameworks like FastAPI and Django. Implemented RESTful APIs, optimized database interactions, and integrated third-party services to enhance application functionality and performance.",
  },
  {
    year: "2025 - 2026",
    role: "Full Stack Developer - Intern",
    company: "Cravite Technologies India Pvt Ltd",
    desc: "Engineered high-performance user interfaces by integrating advanced GSAP animations and React. Focused on optimizing frontend rendering cycles and asset delivery, resulting in a significantly smoother user experience and improved Core Web Vitals.",
  }
];

export default function Experience() {
  const containerRef = useRef(null);

// 
useGSAP(()=>{
    gsap.from(containerRef.current.querySelectorAll(".experience-item"), {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
  });

},{secop:containerRef});

  return (
    <section ref={containerRef} className="py-32 px-6  text-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400">03</span>
          <h2 className="font-['Syne'] text-4xl md:text-5xl font-bold mt-2">Experience</h2>
        </div>

        <div className="experience-container relative">
          {/* Central Vertical Line */}
          <div className="experience-line absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-px h-full bg-linear-to-b from-amber-400 via-amber-400/20 to-transparent" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`experience-item relative flex flex-col md:flex-row items-center w-full ${
                  i % 2 === 0 ? "md:flex-row-reverse left" : "right"
                }`}
              >
                {/* Desktop Year Marker */}
                <div className="hidden md:flex w-1/2 justify-center px-10">
                  <span className="font-mono text-amber-400/50 text-sm">{exp.year}</span>
                </div>

                {/* The Connector Dot */}
                <div className="absolute left-[-4.5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 border-4 border-[#05070a] z-10" />

                {/* Experience Card */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-10">
                  <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-amber-400/30 transition-colors duration-500 group">
                    <span className="md:hidden font-mono text-amber-400/50 text-xs mb-2 block">{exp.year}</span>
                    <h3 className="font-['Syne'] text-xl font-bold group-hover:text-amber-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-white/40 text-sm font-mono mt-1 mb-4">{exp.company}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}