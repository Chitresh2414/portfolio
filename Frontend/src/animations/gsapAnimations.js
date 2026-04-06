import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



/* ================= PROJECT SCROLL ================= */
export const projectAnimation = (cards) => {
  const anim = gsap.from(cards, {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: cards,
      start: "top 80%",
    },
  });

  return anim;
};

/* ================= HERO ================= */

/* ================= SKILLS SCROLL ================= */
export const skillsAnimation = (skills) => {
  const anim = gsap.from(skills, {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: skills,
      start: "top 85%",
    },
  });

  return anim;
};