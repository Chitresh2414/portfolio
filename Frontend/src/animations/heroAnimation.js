import gsap from "gsap";

export const heroAnimation = (container) => {
  const ctx = gsap.context(() => {
    
    // 🎬 Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    tl.from(".title", { y: 80, opacity: 0 })
      .from(".para", { y: 40, opacity: 0 }, "-=0.6")
      .from(
        ".icon",
        {
          scale: 0,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .from(".btn", { y: 40, opacity: 0 }, "-=0.4");

    // 🌊 Floating background
    gsap.to(".bg-1", {
      y: 20,
      x: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".bg-2", {
      y: -20,
      x: -15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ⚡ Smooth Parallax
    let mouseX = 0;
    let mouseY = 0;

    const move = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    window.addEventListener("mousemove", move);

    const update = () => {
      gsap.to(".bg-1", { x: mouseX, y: mouseY, duration: 0.8 });
      gsap.to(".bg-2", { x: -mouseX, y: -mouseY, duration: 1 });
    };

    gsap.ticker.add(update);

    // ✨ Typing Effect
    const textEl = document.querySelector(".typing");
    const words = [
      "Python Full Stack Developer",
      "React + FastAPI Developer",
      "Building Modern Web Apps",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      const currentText = currentWord.substring(0, charIndex);

      textEl.textContent = currentText;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 80);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 40);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 1000);
      }
    };

    type();

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove(update);
    };

  }, container);

  return ctx;
};