import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';
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
          className="section-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {content.kicker}
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.14 }}
        >
          {content.subtitle}
        </motion.p>

        <div className="experience-timeline">
          {content.items.map((item, index) => (
            <motion.article
              className="experience-item"
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.08 }}
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
