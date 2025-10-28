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
          <div className="hero-text">
            <h1>
              Olá, sou <span>André</span>
            </h1>
            <p className="hero-subtitle">
              Desenvolvedor Full Stack | Front-end especializado
            </p>
            <p className="hero-description">
              Crio soluções web completas, do design à implementação, com foco em experiências 
              digitais excepcionais. Especializado em React, TypeScript e Node.js, transformo 
              ideias em produtos funcionais e escaláveis.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollTo('projetos')}>
                Ver Projetos
              </button>
              <button className="btn btn-secondary" onClick={() => scrollTo('contato')}>
                Entre em Contato
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/Imagens/Foto 3x4.webp" alt="Foto de André" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

