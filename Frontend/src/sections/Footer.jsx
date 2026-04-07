import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030303] border-t border-white/5 pt-24 pb-12 px-6 overflow-hidden">
      
      {/* Subtle Background Text - The "Big Brand" Look */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[20vw] font-bold tracking-tighter whitespace-nowrap text-white">
          CHITRESH SEN
        </h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-150 transition-transform duration-500" />
              <span className="font-serif italic text-2xl tracking-tighter text-white">
                Chitresh <span className="font-sans font-bold not-italic">Sen</span>
              </span>
            </Link>
            <p className="max-w-xs text-white/30 font-mono text-[10px] uppercase tracking-[0.3em] leading-loose">
              Designing and developing <br /> high-performance digital <br /> ecosystems in Udaipur, RJ.
            </p>
          </div>

          {/* Social Links with Magnetic Feel */}
          <div className="flex gap-4">
            {[
              { icon: <FaGithub />, href: "https://github.com/Chitresh2414" },
              { icon: <FaLinkedin />, href: "https://linkedin.com/in/chitresh-sen-bca" },
              { icon: <FaInstagram />, href: "https://instagram.com/heyitschinku" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-500 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-500 bg-white/2"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
          
          <div className="flex gap-8 order-2 md:order-1">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">
              © 2026 — ALL RIGHTS RESERVED
            </p>
            <p className="hidden md:block font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">
              UDAIPUR • PUNE • REMOTE
            </p>
          </div>

          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 font-mono text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-all duration-300 order-1 md:order-2"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
               <FiArrowUp size={12} />
            </div>
          </button>

        </div>
      </div>
    </footer>
  );
}