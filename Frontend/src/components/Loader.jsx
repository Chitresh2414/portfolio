import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete, onStart }) {
  const container = useRef(null);
  const [done, setDone] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useLayoutEffect(() => {
    if (!isStarted || !container.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // High-end Exit Sweep
        gsap.to(container.current, {
          yPercent: -100,
          filter: "blur(40px) brightness(3)",
          duration: 1.8,
          ease: "expo.inOut",
          onComplete: () => {
            setDone(true);
            onComplete?.();
          }
        });
      }
    });

    // 1. Title Reveal (Character by Character)
    tl.fromTo(
      container.current.querySelectorAll(".name-char"),
      { y: 150, opacity: 0, rotateX: -90, filter: "blur(15px)" },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        filter: "blur(0px)", 
        stagger: 0.08, 
        duration: 2, 
        ease: "expo.out" 
      }
    )
    // 2. Sub-label expansion
    .fromTo(
      container.current.querySelector(".sub-label"),
      { opacity: 0, letterSpacing: "0.2em" },
      { opacity: 0.4, letterSpacing: "1.2em", duration: 2.5, ease: "power2.out" },
      "-=1.8"
    );

    // 3. Realistic Progress Bar Logic
    const prog = { val: 0 };
    gsap.to(prog, {
      val: 100,
      duration: 4.5, // Total load time
      ease: "power4.inOut",
      onUpdate: () => {
        const percentEl = container.current.querySelector(".percent");
        const fillEl = container.current.querySelector(".fill");
        if (percentEl) percentEl.innerText = Math.round(prog.val);
        if (fillEl) fillEl.style.width = `${prog.val}%`;
      }
    });

  }, [isStarted, onComplete]);

  if (done) return null;

  return (
    <div ref={container} className="fixed inset-0 z-9999 bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_95%)] z-10" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="relative z-20 flex flex-col items-center px-4">
        {!isStarted ? (
          
          /* 4. The Interaction Trigger (Start Button) */
          <div
            onClick={() => {
              onStart?.(); // Trigger Music Start
              setIsStarted(true);
            }}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-700 ease-expo">
              <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_25px_#f59e0b] animate-pulse" />
            </div>
            <div className="mt-8 overflow-hidden">
               <p className="font-mono text-[9px] tracking-[0.8em] text-zinc-500 uppercase group-hover:text-amber-500 transition-colors duration-500 animate-bounce">
                Enter Studio
              </p>
            </div>
          </div>

        ) : (

          /* 5. The Loading Visuals */
          <div className="flex flex-col items-center w-full">
            <p className="sub-label text-zinc-400 font-mono text-[9px] uppercase mb-4 text-center tracking-[0.8em]">
              Digital Portfolio • 2026
            </p>
            
            <h1 className="flex text-5xl md:text-[11rem] font-bold text-white tracking-tighter leading-none italic select-none"
                style={{ fontSize: "clamp(3rem, 15vw, 11rem)" }}>
              {"CHITRESH".split("").map((l, i) => (
                <span key={i} className="name-char inline-block">{l}</span>
              ))}
              <span className="name-char text-amber-500">.</span>
            </h1>

            <div className="mt-24 flex flex-col items-center w-full max-w-sm">
              <div className="flex justify-between w-full mb-4 font-mono text-[9px] text-zinc-600 tracking-[0.4em] uppercase">
                <span className="animate-pulse">Accessing_Systems...</span>
                <span><span className="percent text-white">0</span>%</span>
              </div>
              
              {/* Sleek Progress Track */}
              <div className="w-full h-px bg-white/5 relative overflow-hidden">
                <div className="fill absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_15px_#f59e0b]" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}