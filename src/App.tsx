import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Discussion from "./pages/Discussion";
import Exams from "./pages/Exams";
import Placements from "./pages/Placements";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;