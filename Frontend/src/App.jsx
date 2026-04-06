import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cursor from "./components/Cursor";
import CinematicLoader from "./components/Loader";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null); // Audio ke liye ref

  useEffect(() => {
    // Audio initialize karein par play nahi (policy ki wajah se)
    audioRef.current = new Audio("/music/intro.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start with 0 for fade-in
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        gsap.to(audioRef.current, { volume: 0.5, duration: 4 });
      }).catch(err => console.log("Playback blocked", err));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <BrowserRouter>
      {!loadingComplete && (
        <CinematicLoader
          duration={5}
          onStart={handleStart} // Loader ke button click par trigger hoga
          onComplete={() => setLoadingComplete(true)}
        />
      )}

      {loadingComplete && (
        <>
          <Cursor />
          <Navbar />
          
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-10 left-10 z-100 flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full transition-all duration-500 hover:scale-105"
          >
            <div className="flex items-end gap-0.5 h-3 w-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-0.5 bg-amber-500 rounded-full ${!isMuted ? "animate-bar" : "h-0.5"}`} />
              ))}
            </div>
            <div className="text-white text-lg ml-1">
              {isMuted ? <HiSpeakerXMark className="text-zinc-500" /> : <HiSpeakerWave className="text-amber-500" />}
            </div>
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}

      <style>{`
        @keyframes bar-grow { 0%, 100% { height: 3px; } 50% { height: 12px; } }
        .animate-bar { animation: bar-grow 0.6s infinite ease-in-out; }
      `}</style>
    </BrowserRouter>
  );
}