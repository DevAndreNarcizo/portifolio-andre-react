import { heroTechs } from '../data';
import { useLanguage } from '../i18n';
import './TechMarquee.css';

const TechMarquee = () => {
  const { language } = useLanguage();
  const items = [...heroTechs, ...heroTechs];

  return (
    <section className="tech-marquee" aria-label={language === 'pt' ? 'Tecnologias principais' : 'Main technologies'}>
      <div className="tech-marquee-track">
        {items.map((tech, index) => (
          <span className="tech-marquee-item" key={`${tech.name}-${index}`}>
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
