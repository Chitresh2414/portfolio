import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cursor from "./components/Cursor";
import CinematicLoader from "./components/Loader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // 🎵 Setup audio
  useEffect(() => {
    const audio = new Audio("/music/intero.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // ▶ Start music
  const handleStart = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      gsap.to(audioRef.current, { volume: 0.5, duration: 3 });
    } catch (err) {
      console.log("Audio blocked", err);
    }
  };

  // 🔇 Toggle mute
  const toggleMusic = () => {
    if (!audioRef.current) return;

    const muted = !audioRef.current.muted;
    audioRef.current.muted = muted;
    setIsMuted(muted);
  };

  return (
    <BrowserRouter>
      {!isLoaded ? (
        <CinematicLoader
          onStart={handleStart}
          onComplete={() => setIsLoaded(true)}
        />
      ) : (
        <>
          <Cursor />
          <Navbar />

          {/* 🎵 Music Button */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full"
          >
            {/* Bars */}
            <div className="flex items-end gap-0.5 h-3 w-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-0.5 bg-amber-500 rounded-full ${
                    !isMuted ? "animate-bar" : "h-1"
                  }`}
                />
              ))}
            </div>

            {/* Icon */}
            {isMuted ? (
              <HiSpeakerXMark className="text-zinc-500" />
            ) : (
              <HiSpeakerWave className="text-amber-500" />
            )}
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}

      {/* 🎧 Animation */}
      <style>{`
        @keyframes bar-grow {
          0%, 100% { height: 3px; }
          50% { height: 10px; }
        }
        .animate-bar {
          animation: bar-grow 0.6s infinite ease-in-out;
        }
      `}</style>
    </BrowserRouter>
  );
}