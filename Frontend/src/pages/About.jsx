import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Cinematic Reveal Sequence
      tl.from(".bg-glow", {
        opacity: 0,
        scale: 0.7,
        duration: 2,
        ease: "power2.out",
      })
        .from(
          ".about-label",
          {
            x: -20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.5",
        )
        .from(
          ".about-heading",
          {
            y: 60,
            opacity: 0,
            letterSpacing: "0.1em",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1",
        )
        .from(
          ".about-text",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".about-img-container",
          {
            clipPath: "inset(0% 100% 0% 0%)", // Cinematic wipe effect
            duration: 1.5,
            ease: "power4.inOut",
          },
          "-=1.2",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center px-6 py-24 bg-[#050505] overflow-hidden"
    >
      {/* 1. Cinematic Texture & Lighting */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="bg-glow absolute top-[10%] -left-[5%] w-[40vw] h-[40vw] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="bg-glow absolute bottom-[10%] -right-[5%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* 2. Section Label */}
        <div className="about-label flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-amber-500 font-bold">
            01 / Discovery
          </span>
          <div className="w-12 h-px bg-white/20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-10">
            <h2 className="about-heading text-5xl md:text-7xl font-light tracking-tighter text-white leading-[0.9]">
              Engineering <br />
              <span className="font-serif italic text-amber-500">
                Aesthetics.
              </span>
            </h2>

            <div className="space-y-6 max-w-md">
              <p className="about-text text-lg text-white/60 font-light leading-relaxed">
                I am a{" "}
                <span className="text-white font-medium">
                  Full-Stack Developer
                </span>{" "}
                specializing in the intersection of high-performance logic and
                minimalist design.
              </p>
              <p className="about-text text-white/60 font-light italic">
                Focusing on{" "}
                <span className="text-white">React, FastAPI, and MongoDB</span>{" "}
                to build seamless digital ecosystems.
              </p>
            </div>

            {/* Bento-style Stats */}
            <div className="grid grid-cols-2 gap-4">
              {/* Project Stat */}
              <div className="about-card group p-6 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-all duration-500">
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-light text-amber-500 group-hover:scale-110 transition-transform duration-500 origin-left">
                    10<span className="text-xl">+</span>
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-medium">
                  Projects Completed
                </p>
              </div>

              {/* Experience Stat */}
              <div className="about-card group p-6 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-all duration-500">
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-light text-amber-500 group-hover:scale-110 transition-transform duration-500 origin-left">
                    08
                  </p>
                  <span className="text-xs text-amber-500/60 uppercase">
                    Months
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-medium">
                  Experience
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Soft Ambient Glow under Image */}
            <div className="absolute inset-0 bg-amber-500/5 blur-[80px] rounded-full scale-75" />

            <div className="about-img-container relative aspect-3/4 md:aspect-3/3 rounded-4xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/assets/profile.jpg"
                alt="Chitresh Sen"
                className="w-full h-full object-cover saturate-[0.7] group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-60" />

              {/* Floating ID Card Info */}
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-medium tracking-wider text-sm uppercase">
                  Chitresh Sen
                </p>
                <p className="text-amber-500/60 font-mono text-[10px] uppercase tracking-widest">
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
