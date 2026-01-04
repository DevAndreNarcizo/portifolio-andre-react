import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import KnowledgeHome from './components/KnowledgeHome';
import CheatSheets from './components/CheatSheets';
import Tools from './components/Tools';
import Roadmap from './components/Roadmap';
import Snippets from './components/Snippets';
import Architecture from './components/Architecture';
import './App.css';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/knowledge" element={<KnowledgeHome />} />
            <Route path="/knowledge/cheatsheets" element={<CheatSheets />} />
            <Route path="/knowledge/tools" element={<Tools />} />
            <Route path="/knowledge/roadmap" element={<Roadmap />} />
            <Route path="/knowledge/snippets" element={<Snippets />} />
            <Route path="/knowledge/architecture" element={<Architecture />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
