import { MotionConfig } from 'framer-motion';
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
import './App.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <CursorGlow />
        <Header />
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <ProfessionalProfile />
          <TechStack />
          <Education />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloating />
      </div>
    </MotionConfig>
  );
}

export default App;
