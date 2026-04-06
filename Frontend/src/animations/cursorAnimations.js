import gsap from "gsap";

export const cursorAnimation = (cursorRef, trailRefs, textRef) => {
  const cursor = cursorRef.current;
  const trails = trailRefs.current;
  const text = textRef.current;

  if (!cursor) {
    console.warn("Cursor Ref not found!");
    return;
  }

  console.log("Cursor Logic Initialized");

  // 1. Initial State: Center everything and hide until first move
  gsap.set([cursor, ...trails, text], {
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
  });

  // 2. Performance Setters (quickTo is better for mouse follow)
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

  const trailSetters = trails.map((trail) => ({
    x: gsap.quickTo(trail, "x", { duration: 0.3, ease: "power2" }),
    y: gsap.quickTo(trail, "y", { duration: 0.3, ease: "power2" }),
  }));

  const textX = gsap.quickTo(text, "x", { duration: 0.2 });
  const textY = gsap.quickTo(text, "y", { duration: 0.2 });

  let isVisible = false;

  const moveCursor = (e) => {
    const { clientX, clientY } = e;

    if (!isVisible) {
      gsap.to([cursor, ...trails], { opacity: 1, duration: 0.3 });
      isVisible = true;
    }

    xTo(clientX);
    yTo(clientY);
    textX(clientX);
    textY(clientY);

    trailSetters.forEach((setter) => {
      setter.x(clientX);
      setter.y(clientY);
    });
  };

  // 3. Hover Logic
  const handleOver = (e) => {
    const target = e.target.closest("a, button, .cursor-hover");
    if (!target) return;

    gsap.to(text, { opacity: 1, scale: 1, duration: 0.3 });
    gsap.to(cursor, { scale: 0, duration: 0.2 });
    gsap.to(trails, { scale: 3, opacity: 0.2, duration: 0.3 });
  };

  const handleOut = (e) => {
    const target = e.target.closest("a, button, .cursor-hover");
    if (!target) return;

    gsap.to(text, { opacity: 0, scale: 0, duration: 0.3 });
    gsap.to(cursor, { scale: 1, duration: 0.2 });
    gsap.to(trails, { scale: 1, opacity: 1, duration: 0.3 });
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mouseover", handleOver);
  window.addEventListener("mouseout", handleOut);

  return () => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("mouseover", handleOver);
    window.removeEventListener("mouseout", handleOut);
  };
};