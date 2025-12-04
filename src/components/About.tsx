import { aboutText } from '../data';
import './About.css';

const About = () => {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>{aboutText}</p>
            <p>
              I believe that technical excellence goes hand in hand with user experience.
              My code is always clean, well-documented, and designed for scalability.
              I value collaboration and teamwork, always seeking the best solutions.
            </p>
            <p>
              I am constantly studying new technologies, exploring market trends,
              and contributing to open-source projects. I believe in knowledge sharing
              and helping other developers evolve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

