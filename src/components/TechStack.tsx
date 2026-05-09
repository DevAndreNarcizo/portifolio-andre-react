import { stackGroups } from '../data';
import './TechStack.css';

const TechStack = () => {
  return (
    <section id="stack" className="section bg-alt">
      <div className="container">
        <h2 className="section-title">Stack principal</h2>
        <p className="section-subtitle">
          Tecnologias que uso no dia a dia para construir sistemas completos.
        </p>

        <div className="stack-list">
          {stackGroups.map((group) => (
            <div key={group.category} className="stack-group">
              <h3 className="stack-category">{group.category}</h3>
              <p className="stack-items">{group.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
