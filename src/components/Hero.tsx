import { ArrowRight, Github } from 'lucide-react';
import { contactInfo } from '../data';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(contactInfo.whatsappLink, '_blank');
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-label">Full-Stack Developer</p>
          
          <h1 className="hero-title">
            André Narcizo
          </h1>
          
          <p className="hero-description">
            Atuo na Sysout Tecnologia e em projetos freelance, construindo sistemas web,
            apps mobile, APIs, dashboards e automações. Minha stack principal passa por
            Angular, Laravel, Flutter, Python e PostgreSQL.
          </p>
          
          <p className="hero-description-secondary">
            Tenho evoluído de Full Stack para uma atuação mais arquitetural: código limpo,
            decisões documentadas, regras de negócio bem separadas e software pensado para
            manutenção.
          </p>
          
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('projetos')}>
              Ver projetos
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
            <button className="btn btn-secondary" onClick={openWhatsApp}>
              Falar comigo
            </button>
          </div>
          
          <div className="hero-links">
            <a href={contactInfo.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
