import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugin is registered outside the function
gsap.registerPlugin(ScrollTrigger);

export const skillsAnimation = (container) => {
  if (!container) return;

  let ctx = gsap.context(() => {
    // 1. Initial State (Prevents the "flash" of content)
    gsap.set([".skills-heading", ".skills-line", ".skill"], { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%", // Trigger when container top hits 85% of viewport
        end: "bottom top",
        toggleActions: "play none none none",
        // markers: true, // Uncomment this line to see the trigger points for debugging!
      },
    });

    tl.to(".skills-heading", { 
        opacity: 1, 
        x: 0, 
        duration: 0.8,
        ease: "power3.out"
      })
      .to(".skills-line", { 
        opacity: 1,
        scaleX: 1, 
        transformOrigin: "left center", 
        duration: 1, 
        ease: "power2.inOut" 
      }, "-=0.6")
      .to(".skill", { 
        opacity: 1,
        y: 0, 
        stagger: 0.08, 
        duration: 0.6, 
        ease: "back.out(1.4)" 
      }, "-=0.4");

    // Featured Glow
    gsap.to(".skill.featured", {
      borderColor: "rgba(251, 191, 36, 0.4)",
      duration: 2,
      repeat: -1,
      yoyo: true,
    });

  }, container);

  // Critical for React: Refresh ScrollTrigger
  ScrollTrigger.refresh();

  return ctx;
};