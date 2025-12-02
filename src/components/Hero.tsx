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
              Hello, I'm <span>André</span>
            </h1>
            <p className="hero-subtitle">
              Full Stack Developer | Front-end Specialist
            </p>
            <p className="hero-description">
              I create complete web solutions, from design to implementation, focused on exceptional
              digital experiences. Specialized in React, TypeScript, and Node.js, I transform
              ideas into functional and scalable products.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollTo('projetos')}>
                View Projects
              </button>
              <button className="btn btn-secondary" onClick={() => scrollTo('contato')}>
                Contact Me
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

