import { skills } from '../data';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

