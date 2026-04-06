import gsap from "gsap";

export const heroAnimation = (container) => {
  if (!container) return;

  const ctx = gsap.context(() => {
    // 1. Entrance Timeline
    const tl = gsap.timeline({ 
        defaults: { ease: "power3.out", duration: 1 },
        onStart: () => console.log("Hero Timeline Started") 
    });

    // We use scoped selectors (GSAP context does this automatically)
    tl.from(".title", { y: 50, opacity: 0 })
      .from(".para", { y: 30, opacity: 0 }, "-=0.7")
      .from(".icon-item", { 
        scale: 0, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      }, "-=0.5")
      .from(".btn-hero", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.4");

    // 2. Floating Orbs
    gsap.to(".bg-1", { y: 20, x: 15, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".bg-2", { y: -20, x: -15, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // 3. Mouse Parallax
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(".bg-1", { x: x, y: y, duration: 1, overwrite: "auto" });
      gsap.to(".bg-2", { x: -x, y: -y, duration: 1.2, overwrite: "auto" });
    };
    window.addEventListener("mousemove", move);

    // 4. Typing Effect
    const textEl = container.querySelector(".typing");
    const words = ["Python Full Stack Developer", "React + FastAPI Developer", "Building Modern Web Apps"];
    let wordIdx = 0, charIdx = 0, isDeleting = false, timeout;

    const type = () => {
      const currentWord = words[wordIdx];
      if (textEl) textEl.textContent = currentWord.substring(0, charIdx);

      let speed = isDeleting ? 50 : 100;
      if (!isDeleting && charIdx < currentWord.length) charIdx++;
      else if (isDeleting && charIdx > 0) charIdx--;
      else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIdx = (wordIdx + 1) % words.length;
        speed = 1500; 
      }
      timeout = setTimeout(type, speed);
    };
    type();

    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timeout);
    };
  }, container);

  return ctx;
};