import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial State
      gsap.set(".hero-reveal", { opacity: 0, y: 30 });
      gsap.set(".bg-orb", { opacity: 0, scale: 0.5 });

      // 2. Entrance Animation Sequence
      tl.to(".bg-orb", { opacity: 1, scale: 1, duration: 2, stagger: 0.5, ease: "power4.out" })
        .to(".hero-reveal", { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: "power4.out" 
        }, "-=1.5")
        .from(".hero-line", { scaleX: 0, transformOrigin: "center", duration: 1.5, ease: "expo.inOut" }, "-=1");

      // 3. Subtle Mouse Parallax for Orbs
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".bg-orb-1", { x: xPos, y: yPos, duration: 1, ease: "power2.out" });
        gsap.to(".bg-orb-2", { x: -xPos, y: -yPos, duration: 1, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center h-screen overflow-hidden bg-[#030303] text-white"
    >
      {/* 1. Cinematic Background Elements */}
      <div className="bg-orb bg-orb-1 absolute w-[40vw] h-[40vw] rounded-full bg-amber-500/10 blur-[120px] -top-20 -left-20 pointer-events-none" />
      <div className="bg-orb bg-orb-2 absolute w-[35vw] h-[35vw] rounded-full bg-blue-600/10 blur-[120px] -bottom-20 -right-20 pointer-events-none" />

      {/* Modern Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 2. Main Content Area */}
      <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-5xl mx-auto">
        
        {/* Availability Badge */}
        <div className="hero-reveal mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/3 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/60">
            Available for opportunities
          </span>
        </div>

        {/* Cinematic Title */}
        <h1 className="hero-reveal text-6xl md:text-9xl font-light tracking-tighter leading-[0.85] mb-6">
          Full Stack <br />
          <span className="font-serif italic text-amber-500">Developer.</span>
        </h1>

        <div className="hero-line w-24 h-px bg-amber-500/50 mb-8" />

        {/* Description */}
        <p className="hero-reveal max-w-xl text-lg md:text-xl text-white/50 font-light leading-relaxed tracking-tight">
          Crafting high-performance <span className="text-white">Python</span> backends and 
          <br className="hidden md:block" /> immersive <span className="text-white">React</span> interfaces.
        </p>

        {/* CTA Section */}
        <div className="hero-reveal mt-12 flex gap-6 items-center flex-wrap justify-center">
          <button className="group relative px-10 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="relative z-10 text-xs tracking-widest uppercase">Start a Project</span>
            <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <div className="flex gap-4">
            {[
              { icon: <FaGithub />, link: "https://github.com/chitresh2414" },
              { icon: <FaLinkedin />, link: "https://linkedin.com/in/chitresh-sen-bca" }
            ].map((social, i) => (
              <a key={i} href={social.link} target="_blank" className="p-4 rounded-full border border-white/10 text-white/40 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-500 bg-white/2">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Cinematic Scroll Indicator */}
      <div className="hero-reveal absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-linear-to-b from-amber-500/50 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/20">Udaipur, RJ</span>
      </div>
    </section>
  );
}