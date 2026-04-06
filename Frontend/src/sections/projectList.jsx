import { useEffect } from "react";
import { projectAnimation } from "../animations/gsapAnimations";

export default function ProjectList() {

  useEffect(() => {
    projectAnimation();
  }, []);

  const projects = ["E-Commerce", "AI App", "Portfolio"];

  return (
    <section className="py-24 px-6">
      <h2 className="text-5xl text-center mb-16">Projects</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className="card p-6 bg-white/5 border border-white/10 rounded-xl hover:scale-105 transition"
          >
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}