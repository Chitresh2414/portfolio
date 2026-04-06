import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global background — single source of truth */}
      <div className="fixed inset-0 -z-10 bg-[#080a12]">
        <div className="absolute w-175 h-175 rounded-full bg-amber-500/5 blur-[120px] -top-40 -left-40 pointer-events-none" />
        <div className="absolute w-125 h-125 rounded-full bg-cyan-500/5 blur-[100px] top-1/2 -right-60 pointer-events-none" />
        <div className="absolute w-100 h-100 rounded-full bg-amber-400/5 blur-[80px] bottom-0 left-1/3 pointer-events-none" />
      </div>

      <Cursor />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}