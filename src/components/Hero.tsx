import { ArrowRight, Github, Linkedin, Server } from 'lucide-react';
import { contactInfo } from '../data';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badges">
            <span className="hero-badge">Backend & Architecture</span>
            <span className="hero-badge">Full-Stack Developer</span>
          </div>

          <h1 className="hero-title">
            Andre Narcizo
          </h1>

          <p className="hero-description">
            I build production-grade backends, APIs, and full-stack systems.
            Laravel, Node.js, Python. PostgreSQL, Redis, RabbitMQ.
            Clean Architecture, SOLID, Docker, CI/CD.
          </p>

          <p className="hero-description-secondary">
            Currently at Sysout Tecnologia, delivering enterprise Angular systems and Laravel APIs.
            Evolving from Full-Stack execution toward Software Architecture —
            with every decision documented and every layer testable.
          </p>

          <p className="hero-description-pt">
            Atuo na Sysout Tecnologia e em projetos freelance. Minha stack principal:
            Angular, Laravel, Flutter, Python e PostgreSQL. Entregando sistemas completos —
            do banco ao deploy, com codigo limpo e arquitetura bem definida.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('projetos')}>
              View projects
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
            <a href={contactInfo.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Github size={16} style={{ marginRight: 6 }} />
              GitHub
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Linkedin size={16} style={{ marginRight: 6 }} />
              LinkedIn
            </a>
          </div>

          <div className="hero-quick-stats">
            <div className="quick-stat">
              <Server size={14} />
              <span>Clean Architecture</span>
            </div>
            <div className="quick-stat">
              <span className="stat-dot" />
              <span>Docker + CI/CD</span>
            </div>
            <div className="quick-stat">
              <span className="stat-dot" />
              <span>Test-Driven</span>
            </div>
            <div className="quick-stat">
              <span className="stat-dot" />
              <span>Event-Driven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
