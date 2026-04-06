import { useEffect, useRef } from "react";
import { heroAnimation } from "../animations/heroAnimation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = heroAnimation(containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center h-screen bg-black text-white overflow-hidden"
    >
      {/* Background */}
<div className="bg-1 absolute w-105 h-105 bg-linear-to-br from-cyan-400/30 to-blue-500/20 blur-3xl rounded-full -top-40 -left-40" />

<div className="bg-2 absolute w-95 h-95 bg-linear-to-tr from-purple-500/30 to-pink-500/20 blur-3xl rounded-full -bottom-40 -right-40" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4">
        {/* 🔥 Typing Title */}
        <h1 className="title text-5xl md:text-7xl font-bold">
          <span className="typing bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"></span>
        </h1>

        {/* Subtitle */}
        <p className="para mt-4 max-w-md text-gray-400">
          Building modern web applications using React & FastAPI.
        </p>

        {/* Social */}
        <div className="flex gap-6 mt-6 text-2xl">
          <a href="https://github.com" className="icon">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" className="icon">
            <FaLinkedin />
          </a>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <a
            href="/resume.pdf"
            download
            className="btn px-6 py-2 border rounded-full"
          >
            Resume
          </a>

          <button className="btn px-6 py-2 bg-white text-black rounded-full">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
