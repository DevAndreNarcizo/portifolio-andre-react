import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';
import './About.css';

const About = () => {
  const { language } = useLanguage();
  const t = text[language].about;

  return (
    <section id="sobre" className="section bg-alt">
      <div className="container-wide">
        <div className="about-layout">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
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
            {t.metrics.map((metric, i) => (
              <motion.div
                className="about-metric-card"
                key={metric.label}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.1 }}
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
