import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './Experience.css';

/**
 * Renderiza a trajetória profissional em uma linha do tempo bilíngue.
 * @author André Narcizo - andre.narcizo@sysout.com.br
 */
const Experience = () => {
  const { language } = useLanguage();
  const content = text[language].experience;

  return (
    <section id="experiencia" className="section experience-section">
      <div className="container-wide">
        <motion.p
          data-build
          className="section-kicker"
        >
          {content.kicker}
        </motion.p>

        <motion.h2
          data-build
          className="section-title"
        >
          {content.title}
        </motion.h2>

        <motion.p
          data-build
          className="section-subtitle"
        >
          {content.subtitle}
        </motion.p>

        <div className="experience-timeline">
          {content.items.map((item) => (
            <motion.article
              data-build
              className="experience-item"
              key={`${item.company}-${item.period}`}
            >
              <div className="experience-marker" aria-hidden="true">
                <BriefcaseBusiness size={17} />
              </div>
              <div className="experience-card">
                <div className="experience-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.period}</span>
                </div>
                <p className="experience-description">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
