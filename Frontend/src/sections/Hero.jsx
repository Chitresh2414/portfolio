import { useLayoutEffect, useRef } from "react";
import { heroAnimation } from "../animations/heroAnimation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Only run if the ref is attached
    if (!containerRef.current) return;

    const ctx = heroAnimation(containerRef.current);
    
    // Clean up on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center h-screen overflow-hidden bg-[#080a12] text-white"
    >
      {/* Background Orbs */}
      <div className="bg-1 absolute w-96 h-96 rounded-full bg-amber-400/10 blur-[100px] top-20 left-10 pointer-events-none" />
      <div className="bg-2 absolute w-80 h-80 rounded-full bg-cyan-400/5 blur-[100px] bottom-20 right-10 pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="btn-animate mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase text-amber-400/80">
            Available for work
          </span>
        </div>

        {/* Title & Typing Effect */}
        <h1 className="title text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-2 min-h-[1.2em]">
          <span className="typing" />
          <span className="inline-block w-1 h-10 md:h-16 bg-amber-400 ml-2 animate-pulse align-middle" />
        </h1>

        {/* Paragraph */}
        <p className="para mt-6 max-w-lg text-white/40 leading-relaxed font-mono text-sm tracking-wide">
          Building modern web applications using React & FastAPI. Clean code. Fast products. Real results.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 mt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="icon flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="icon flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300"
          >
            <FaLinkedin size={18} />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <a
            href="/resume.pdf"
            download
            className="btn-animate font-mono text-xs tracking-widest uppercase px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300"
          >
            Resume
          </a>
          <button className="btn-animate font-mono text-xs tracking-widest uppercase px-8 py-3.5 rounded-full bg-amber-400 text-[#080a12] font-bold hover:bg-amber-300 transition-all duration-300">
            Contact
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-white to-transparent" />
      </div>
    </section>
  );
}