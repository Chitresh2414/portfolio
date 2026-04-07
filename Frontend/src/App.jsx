import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

// Components
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

// Helper: Page change hone par scroll hamesha top par rahega
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const loaderAudio = useRef(null);
  const mainAudio = useRef(null);

  useEffect(() => {
    // 1. Loader Music (public/music/int.mp3)
    loaderAudio.current = new Audio("/music/int.mp3");
    loaderAudio.current.loop = true;
    loaderAudio.current.volume = 0;

    // 2. Main Music (public/music/intro.mp3)
    mainAudio.current = new Audio("/music/intro.mp3");
    mainAudio.current.loop = true;
    mainAudio.current.volume = 0;

    return () => {
      loaderAudio.current?.pause();
      mainAudio.current?.pause();
    };
  }, []);

  // ▶ Loader start hote hi music play hoga
  const handleStartLoaderMusic = async () => {
    if (!loaderAudio.current) return;
    try {
      await loaderAudio.current.play();
      gsap.to(loaderAudio.current, { volume: 0.4, duration: 2 });
    } catch (err) { console.log("Audio blocked", err); }
  };

  // 🔄 Transition from Loader to Main Site
  const handleTransitionToMain = () => {
    if (!loaderAudio.current || !mainAudio.current) return;

    const tl = gsap.timeline();

    // Cross-fade: Loader music fade out, Main music fade in
    tl.to(loaderAudio.current, { 
      volume: 0, 
      duration: 2, 
      onComplete: () => loaderAudio.current.pause() 
    });

    mainAudio.current.play();
    tl.to(mainAudio.current, { 
      volume: 0.3, 
      duration: 3, 
      ease: "sine.inOut" 
    }, "-=1.5");

    setIsLoaded(true);
  };

  const toggleMute = () => {
    const activeAudio = isLoaded ? mainAudio.current : loaderAudio.current;
    if (activeAudio) {
      const newMuteState = !isMuted;
      activeAudio.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {!isLoaded ? (
        <Loader 
          onStart={handleStartLoaderMusic} 
          onComplete={handleTransitionToMain} 
        />
      ) : (
        <div className="bg-[#030303] min-h-screen selection:bg-amber-500/30 selection:text-amber-500">
          <Cursor />
          <Navbar />
          
          {/* 🎵 Global Music Controller */}
          <button 
            onClick={toggleMute} 
            className="fixed bottom-8 left-8 z-100 flex items-center gap-3 px-4 py-2 bg-white/3 backdrop-blur-xl border border-white/10 rounded-full group hover:border-amber-500/50 transition-all duration-500"
          >
             <div className="flex items-end gap-1 h-3">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i} 
                    className={`w-0.5 bg-amber-500 rounded-full transition-all duration-300 ${!isMuted ? "animate-bar" : "h-0.5 opacity-30"}`} 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
             </div>
             
             <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] group-hover:text-amber-500 transition-colors">
               {isMuted ? "Sound Off" : "Atmosphere"}
             </span>

             <div className="text-white/40 group-hover:text-amber-500 transition-colors">
               {isMuted ? <HiSpeakerXMark size={14}/> : <HiSpeakerWave size={14}/>}
             </div>
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>

          {/* Cinematic Grain Overlay */}
          <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-99 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      )}

      <style>{`
        @keyframes bar-grow {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        .animate-bar {
          animation: bar-grow 0.8s infinite ease-in-out;
        }
      `}</style>
    </BrowserRouter>
  );
}