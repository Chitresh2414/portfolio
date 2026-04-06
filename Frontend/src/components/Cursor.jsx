import { useEffect, useRef } from "react";
import { cursorAnimation } from "../animations/cursorAnimations";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const cleanup = cursorAnimation(cursorRef, trailRefs, textRef);
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className="hidden md:block"> {/* Hide on mobile to prevent bugs */}
      {/* Main Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-amber-400 rounded-full pointer-events-none z-9999 mix-blend-difference"
      />

      {/* Trail Rings */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-8 h-8 border border-amber-400/20 rounded-full pointer-events-none z-9998"
        />
      ))}

      {/* Floating Text / SVG */}
      <div
        ref={textRef}
        className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center opacity-0 scale-0"
      >
        <div className="w-20 h-20 flex items-center justify-center relative">
           <span className="text-amber-400 text-[10px] font-mono tracking-widest uppercase bg-black/80 px-2 py-1 rounded">View</span>
        </div>
      </div>
    </div>
  );
}