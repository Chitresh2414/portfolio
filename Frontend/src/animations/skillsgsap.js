import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const skillsAnimation = (container) => {
  const ctx = gsap.context(() => {
    
    gsap.from(".skill", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      },
    });

  }, container);

  return ctx; // cleanup ke liye
};