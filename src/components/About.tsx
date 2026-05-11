import { aboutTextEn, aboutTextPt } from '../data';
import './About.css';

const About = () => {
  return (
    <section id="sobre" className="section bg-alt">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image-side">
            <div className="about-image-container">
              <img src="/Imagens/Foto.webp" alt="Andre Narcizo" className="about-photo" />
            </div>
          </div>

          <div className="about-content">
            <h2 className="section-title">About</h2>
            <div className="about-text-content">
              {aboutTextEn.split('\n\n').map((paragraph, index) => (
                <p key={`en-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="about-divider">
              <span>PT</span>
            </div>

            <div className="about-text-content about-text-pt">
              {aboutTextPt.split('\n\n').map((paragraph, index) => (
                <p key={`pt-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="about-badges">
              <span className="about-badge">Full-Stack Developer</span>
              <span className="about-badge">Computer Science</span>
              <span className="about-badge">Sysout Tecnologia</span>
              <span className="about-badge">Clean Architecture</span>
              <span className="about-badge">Docker & CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
