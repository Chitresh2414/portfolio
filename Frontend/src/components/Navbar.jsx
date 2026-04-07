import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi"; // More minimal icon
import { VscClose } from "react-icons/vsc";
import gsap from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Scroll logic
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP Mobile Menu Animation
  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, {
        clipPath: "circle(141.4% at 100% 0%)",
        duration: 0.8,
        ease: "expo.inOut",
      });
      gsap.fromTo(".nav-item-mobile", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-700 ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          
          {/* Logo - Minimal & Bold */}
          <Link to="/" className="group flex items-center gap-3 relative z-110">
            <div className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 group-hover:animate-ping`} />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </div>
            <span className="font-serif italic text-xl tracking-tighter text-white">
              Chitresh <span className="font-sans font-bold not-italic">Sen</span>
            </span>
          </Link>

          {/* Desktop Navigation - "The Floating Dock" */}
          <div className={`hidden md:flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-500 ${
            scrolled 
            ? "bg-white/3 border-white/10 backdrop-blur-xl shadow-2xl" 
            : "bg-transparent border-transparent"
          }`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-300 relative group ${
                    isActive ? "text-amber-500" : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-110 md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <VscClose size={20} /> : <HiOutlineMenuAlt4 size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Overlay */}
      <div
        ref={menuRef}
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        className="fixed inset-0 z-105 bg-[#050505] flex flex-col items-center justify-center md:hidden"
      >
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="nav-item-mobile text-5xl font-light tracking-tighter text-white hover:text-amber-500 transition-colors"
            >
              {link.name}
              {location.pathname === link.path && <span className="text-amber-500">.</span>}
            </Link>
          ))}
          
          <div className="nav-item-mobile mt-10 flex gap-6">
             <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">Udaipur, India</span>
          </div>
        </div>
      </div>
    </>
  );
}