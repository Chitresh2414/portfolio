import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const projectAnimation = (cards) => {
  if (!cards || cards.length === 0) return;

  // Kill previous triggers
  ScrollTrigger.getAll().forEach((st) => st.kill());

  cards.forEach((card) => {
    const titleEl = card.querySelector("h3");
    const fullText = titleEl.textContent;
    titleEl.textContent = ""; // Clear for typing

    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex <= fullText.length) {
        titleEl.textContent = fullText.substring(0, charIndex);
        charIndex++;
        requestAnimationFrame(typeNextChar); // smoother animation
      }
    };

    // GSAP fade-in for the card
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          typeNextChar(); // start typing when card enters view
        },
      },
    });
  });
};