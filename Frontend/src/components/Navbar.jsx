import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 px-6 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 text-white">
      
      <div className="flex justify-between items-center">

        {/* 🔥 Logo */}
        <h1 className="text-2xl font-bold">
          <Link
            to="/"
            className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            MyPortfolio
          </Link>
        </h1>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                relative group
                hover:text-cyan-400 transition
              "
            >
              {link.name}

              {/* 🔥 Hover Underline */}
              <span className="
                absolute left-0 -bottom-1 w-0 h-0.5
                bg-linear-to-r from-cyan-400 to-purple-500
                transition-all duration-300
                group-hover:w-full
              " />
            </Link>
          ))}
        </div>

        {/* 📱 Mobile Toggle */}
        <div className="md:hidden text-2xl cursor-pointer">
          {open ? (
            <FaTimes onClick={() => setOpen(false)} />
          ) : (
            <FaBars onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-60 mt-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-lg hover:text-cyan-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}