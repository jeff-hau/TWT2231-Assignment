import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Map from "./pages/Map";
import News from './pages/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Awareness from "./pages/Awareness";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/TWT2231-Assignment/" element={<Home />} />
          <Route path="/TWT2231-Assignment/contact" element={<Contact />} />
          <Route path="/TWT2231-Assignment/map" element={<Map />} />
          <Route path="/TWT2231-Assignment/news" element={<News />} />
          <Route path="/TWT2231-Assignment/awareness" element={<Awareness />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
