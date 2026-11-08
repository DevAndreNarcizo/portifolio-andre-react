import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './About.css';

const About = () => {
  const { language } = useLanguage();
  const t = text[language].about;

  return (
    <section id="sobre" className="section bg-alt">
      <div className="container-wide">
        <div className="about-layout">
          <motion.div
            data-build
            className="about-content"
          >
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="section-title">{t.title}</h2>
            <div className="about-text-content">
              {t.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <div className="about-metrics">
            {t.metrics.map((metric) => (
              <motion.div
                data-build
                className="about-metric-card"
                key={metric.label}
                whileHover={{ y: -5, borderColor: 'rgba(var(--color-accent-rgb), 0.28)' }}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
