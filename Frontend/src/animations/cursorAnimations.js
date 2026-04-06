import gsap from "gsap";

export const cursorAnimation = (cursorRef, trailRefs, textRef) => {
  const cursor = cursorRef.current;
  const trails = trailRefs.current;
  const text = textRef.current;

  if (!cursor || !trails || !text) return;

  // ⚡ Smooth main cursor
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.15 });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.15 });

  // 🔵 Trail setup
  const trailSetters = trails.map((trail, i) => ({
    x: gsap.quickTo(trail, "x", { duration: 0.3 + i * 0.05 }),
    y: gsap.quickTo(trail, "y", { duration: 0.3 + i * 0.05 }),
  }));

  // 📝 Text follow
  const textX = gsap.quickTo(text, "x", { duration: 0.2 });
  const textY = gsap.quickTo(text, "y", { duration: 0.2 });

  const moveCursor = (e) => {
    const { clientX, clientY } = e;

    xTo(clientX);
    yTo(clientY);

    textX(clientX + 15);
    textY(clientY + 15);

    trailSetters.forEach((setter) => {
      setter.x(clientX);
      setter.y(clientY);
    });
  };

  window.addEventListener("mousemove", moveCursor);

  // 🎯 Hover elements
  const elements = document.querySelectorAll("a, button, .cursor-hover");

  const onEnter = (e) => {
    const label = e.target.getAttribute("data-cursor") || {};

    gsap.to([cursor, ...trails], {
      scale: 2,
      duration: 0.3,
    });

    gsap.to(text, {
      opacity: 1,
      duration: 0.2,
    });

    // text.innerText = label;
  };

  const onLeave = () => {
    gsap.to([cursor, ...trails], {
      scale: 1,
      duration: 0.3,
    });

    gsap.to(text, {
      opacity: 0,
      duration: 0.2,
    });
  };

  elements.forEach((el) => {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });

  // 🧲 Magnetic effect
  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.3 });
    });
  });

  // 🧹 Cleanup
  return () => {
    window.removeEventListener("mousemove", moveCursor);

    elements.forEach((el) => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    });
  };
};