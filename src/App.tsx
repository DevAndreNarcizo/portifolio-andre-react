import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Projects from './components/Projects';
import Services from './components/Services';
import TechStack from './components/TechStack';
import About from './components/About';
import ProfessionalProfile from './components/ProfessionalProfile';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CursorGlow from './components/CursorGlow';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

const HomePage = () => (
  <>
    <Hero />
    <TechMarquee />
    <About />
    <ProfessionalProfile />
    <TechStack />
    <Education />
    <Projects />
    <Services />
    <Contact />
  </>
);

function App() {
  useScrollReveal();

  return (
    <Router>
      <div className="app">
        <CursorGlow />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloating />
      </div>
    </Router>
  );
}

export default App;
