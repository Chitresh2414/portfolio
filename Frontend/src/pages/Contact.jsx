import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef(null);
  const formRef = useRef(null);

  // 1. State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const socials = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/chitresh-sen-bca",
      color: "#0077B5",
    },
    {
      name: "GitHub",
      url: "https://github.com/chitresh2414",
      color: "#6e5494",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/heyitschinku",
      color: "#E4405F",
    },
  ];

  // 2. Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      // Replace with your actual backend URL (e.g., Render URL)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        formData,
      );

      if (response.status === 200) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", msg: "" }); // Reset form
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
      console.error("Submission Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".contact-reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      }).from(
        ".contact-glass-card",
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.8",
      );

      const btn = document.querySelector(".magnetic-btn");
      if (btn) {
        btn.addEventListener("mousemove", (e) => {
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (e.clientX - left - width / 2) * 0.35;
          const y = (e.clientY - top - height / 2) * 0.35;
          gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        });
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen bg-[#030303] text-white py-24 px-6 flex items-center overflow-hidden"
    >
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-24">
          <div className="contact-reveal flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-amber-500/80">
              Available for projects
            </span>
          </div>
          <h2 className="contact-reveal text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-4">
            Let's create <br />
            <span className="font-serif italic text-amber-500">greatness.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
            {[
              { id: "name", label: "Full Name", type: "text", name: "name" },
              {
                id: "email",
                label: "Email Address",
                type: "email",
                name: "email",
              },
              {
                id: "msg",
                label: "Your Message",
                type: "textarea",
                name: "msg",
              },
            ].map((field) => (
              <div key={field.id} className="contact-reveal relative group">
                {field.type === "textarea" ? (
                  <textarea
                    rows="3"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-amber-500 transition-all duration-500 peer text-2xl font-light resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-amber-500 transition-all duration-500 peer text-2xl font-light"
                  />
                )}
                <label
                  className="absolute left-0 top-4 text-white/20 pointer-events-none transition-all duration-500 
                  peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-amber-500 peer-focus:tracking-[0.3em]
                  peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-mono"
                >
                  {field.label}
                </label>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-amber-500 transition-all duration-700 peer-focus:w-full" />
              </div>
            ))}

            <div className="contact-reveal pt-10">
              <button
                type="submit"
                className="magnetic-btn group relative px-14 py-6 bg-white text-black rounded-full font-bold overflow-hidden transition-transform duration-300"
              >
                <span className="relative z-10 tracking-widest text-xs">
                  {status.type === "loading"
                    ? "SENDING..."
                    : "DISPATCH MESSAGE"}
                </span>
                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>

              {/* Status Message */}
              {status.message && (
                <p
                  className={`mt-4 font-mono text-[10px] uppercase tracking-widest ${status.type === "error" ? "text-red-500" : "text-amber-500"}`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>

          <div className="space-y-8">
            <div className="contact-glass-card p-12 rounded-[2.5rem] bg-white/2 border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-colors duration-700" />

              <h4 className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-12">
                Contact Data
              </h4>

              <div className="space-y-12">
                <div>
                  <p className="text-amber-500 text-[10px] uppercase tracking-widest mb-3 font-bold">
                    Location
                  </p>
                  <p className="text-2xl font-light text-white/80">
                    Pune, Maharashtra, India
                  </p>
                </div>

                <div>
                  <p className="text-amber-500 text-[10px] uppercase tracking-widest mb-3 font-bold">
                    Inquiries
                  </p>
                  <p className="text-2xl font-light text-white/80 hover:text-white transition-colors break-all">
                    chitresharya123@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-amber-500 text-[10px] uppercase tracking-widest mb-6 font-bold">
                    Social Echo
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono tracking-tighter hover:bg-white hover:text-black transition-all duration-500"
                      >
                        {social.name.toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="contact-reveal text-[10px] text-white/20 font-mono tracking-[0.5em] uppercase text-center lg:text-left">
              &copy; 2026 Chitresh Sen Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
