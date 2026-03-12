import { aboutText } from '../data';
import './About.css';

const About = () => {
  return (
    <section id="sobre" className="section bg-alt">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image-side">
            <div className="about-image-container glass-card">
              <img src="/Imagens/Foto.webp" alt="André Narcizo" className="about-photo" />
              <div className="about-image-glow"></div>
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-title">Autoridade & Mentalidade de Engenharia</h2>
            <div className="about-text-content">
              {aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="about-badges">
              <span className="about-badge">Full Stack Developer</span>
              <span className="about-badge">Ciência da Computação (8º P)</span>
              <span className="about-badge">Visão Estratégica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
