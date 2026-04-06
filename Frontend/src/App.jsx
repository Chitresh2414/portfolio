import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <BrowserRouter>
      <Cursor/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}