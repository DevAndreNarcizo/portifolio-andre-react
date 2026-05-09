import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Notes from './components/Notes';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import './App.css';

const HomePage = () => (
  <>
    <Hero />
    <Projects />
    <Services />
    <TechStack />
    <Notes />
    <About />
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
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloating />
      </div>
    </Router>
  );
}

export default App;
