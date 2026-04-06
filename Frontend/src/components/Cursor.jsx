import { useEffect, useRef } from "react";
import { cursorAnimation } from "../animations/cursorAnimations";

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const cleanup = cursorAnimation(cursorRef, trailRefs, textRef);
    return () => cleanup && cleanup();
  }, []);

  return (
    <>
      {/* 🔵 Trail */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-3 h-3 bg-white/30 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2"
        />
      ))}

      {/* 🟢 Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />

      {/* 📝 Cursor Text */}
      <div
        ref={textRef}
        className="fixed top-0 left-0 text-xs text-white pointer-events-none z-9999 opacity-0 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Text will be set dynamically via animation */}
      </div>
    </>
  );
}