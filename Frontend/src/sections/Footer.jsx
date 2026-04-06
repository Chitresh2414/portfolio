import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-150 transition-transform duration-300" />
          <span className="font-['Syne'] text-lg font-bold">
            Chitresh<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Copy */}
        <p className="font-['DM_Mono'] text-[10px] tracking-widest uppercase text-white/20">
          © 2026 — Built with React & GSAP
        </p>

        {/* Socials */}
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/8 text-white/30 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-300"
          >
            <FaGithub size={14} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/8 text-white/30 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-300"
          >
            <FaLinkedin size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}