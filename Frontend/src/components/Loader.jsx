import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Loader({ onComplete, onStart }) {
  const container = useRef(null);
  const [done, setDone] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useGSAP(() => {
    // 1. Timeline for Name Reveal & Exit
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.to(container.current, {
          yPercent: -100,
          filter: "blur(30px) brightness(2)",
          duration: 1.5,
          ease: "expo.inOut",
          onComplete: () => {
            setDone(true);
            onComplete?.();
          }
        });
      }
    });

    if (isStarted) {
      // Step A: Name Reveal
      tl.fromTo(".name-char", 
        { y: 100, opacity: 0, rotateX: -90, filter: "blur(10px)" },
        { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", stagger: 0.1, duration: 2, ease: "expo.out" }
      )
      .fromTo(".sub-label", 
        { opacity: 0, letterSpacing: "0.2em" },
        { opacity: 0.5, letterSpacing: "1.2em", duration: 3, ease: "power2.out" },
        "-=1.5"
      );

      // Step B: Progress Bar Sync
      const prog = { val: 0 };
      gsap.to(prog, {
        val: 100,
        duration: 5, 
        ease: "power2.inOut",
        onUpdate: () => {
          if (container.current) {
            const percentEl = container.current.querySelector(".percent");
            const fillEl = container.current.querySelector(".fill");
            if (percentEl) percentEl.innerText = Math.round(prog.val);
            if (fillEl) fillEl.style.width = `${prog.val}%`;
          }
        },
        onComplete: () => tl.play()
      });

      tl.play();
    }
  }, { scope: container, dependencies: [isStarted] });

  if (done) return null;

  return (
    <div ref={container} className="fixed inset-0 z-9999 bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_95%)] z-10" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="relative z-20 flex flex-col items-center">
        {!isStarted ? (
          <div 
            onClick={() => {
              onStart(); // Trigger audio from App.js
              setIsStarted(true);
            }}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-500">
               <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]" />
            </div>
            <p className="mt-8 font-mono text-[10px] tracking-[0.8em] text-zinc-500 uppercase group-hover:text-white transition-colors">
              Initialize Interface
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="overflow-hidden mb-3 text-center">
              <p className="sub-label text-zinc-400 font-mono text-[10px] uppercase">
                Creative Full-Stack Developer
              </p>
            </div>

            <h1 className="flex text-5xl md:text-[11rem] font-black text-white tracking-tighter leading-none italic select-none"
                style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}>
              {"CHITRESH".split("").map((l, i) => (
                <span key={i} className="name-char inline-block">{l}</span>
              ))}
              <span className="name-char text-amber-500">.</span>
            </h1>

            <div className="mt-20 flex flex-col items-center w-full max-w-70">
              <div className="flex justify-between w-full mb-3 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                <span className="animate-pulse">Loading_Core</span>
                <span><span className="percent text-white">0</span>%</span>
              </div>
              <div className="w-full h-px bg-white/10 relative overflow-hidden">
                <div className="fill absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_white]" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Frame Bars */}
      <div className="absolute top-0 w-full h-[10vh] bg-black border-b border-white/5 z-30" />
      <div className="absolute bottom-0 w-full h-[10vh] bg-black border-t border-white/5 z-30" />
      
      <div className="absolute bottom-8 text-[8px] font-mono text-zinc-700 tracking-[0.5em] uppercase">
        © 2026 // CHITRESH SEN // PUNE, INDIA
      </div>
    </div>
  );
}