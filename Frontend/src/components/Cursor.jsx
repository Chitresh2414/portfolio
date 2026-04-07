import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    // 1. Smooth Follow Logic
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // Main dot (Instant follow)
      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.1,
        ease: "power2.out"
      });

      // Follower ring (Slight delay/lag for cinematic feel)
      gsap.to(follower, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out"
      });

      // Label (Parallax follow)
      gsap.to(label, {
        x: x,
        y: y,
        duration: 0.7,
        ease: "power4.out"
      });
    };

    // 2. Interaction Logic (Hovering over links/buttons)
    const handleHover = (e) => {
      const isHoverable = e.target.closest("a, button, .project-card, .skill-card");
      const isProject = e.target.closest(".project-card");

      if (isHoverable) {
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { 
          scale: 2.5, 
          backgroundColor: "rgba(245, 158, 11, 0.1)", // Amber-500/10
          borderColor: "rgba(245, 158, 11, 0.5)",
          duration: 0.3 
        });
        
        if (isProject) {
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
        }
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent", 
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3 
        });
        gsap.to(label, { opacity: 0, scale: 0, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-9999">
      {/* 1. Main Precision Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* 2. Cinematic Follower Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-500"
      />

      {/* 3. Contextual Label (e.g., "VIEW") */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 opacity-0 scale-0 -translate-x-1/2 -translate-y-[120%] pointer-events-none"
      >
        <div className="px-3 py-1 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-black uppercase">
            View Project
          </span>
        </div>
      </div>
    </div>
  );
}