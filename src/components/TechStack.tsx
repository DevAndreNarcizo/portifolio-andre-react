import { skills } from '../data';
import './TechStack.css';

const TechStack = () => {
  return (
    <section id="stack" className="section bg-alt">
      <div className="container">
        <h2 className="section-title">Tecnologias que Geram Resultados</h2>
        <p className="section-subtitle">
          Stack moderna focada em entregar sistemas rápidos, seguros e prontos para o crescimento do seu negócio.
        </p>

        <div className="tech-benefits-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="tech-benefit-card glass-card">
              <div className="benefit-header">
                <span className="benefit-tag">Engenharia</span>
                <span className="benefit-name">{skill.name}</span>
              </div>
              <p className="benefit-text">{skill.benefit}</p>
              <div className="benefit-footer">
                <div className="benefit-status">
                  <div className="pulse-dot"></div>
                  Especialista
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
