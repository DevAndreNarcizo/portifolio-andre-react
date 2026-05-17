import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './Education.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

const Education = () => {
  const { language } = useLanguage();
  const t = text[language].education;

  return (
    <section id="formacao" className="section education-section">
      <div className="container-wide">
        <motion.p
          className="section-kicker reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {t.kicker}
        </motion.p>
        <motion.h2
          className="section-title reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          className="section-subtitle reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.14 }}
        >
          {t.subtitle}
        </motion.p>

        <div className="education-grid">
          <div className="education-column">
            <div className="education-column-title">
              <GraduationCap size={20} />
              <h3>{t.educationTitle}</h3>
            </div>
            {t.items.map((item, i) => (
              <motion.article
                className="education-card reveal reveal-stagger"
                key={`${item.title}-${item.institution}`}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.18 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(var(--color-accent-rgb), 0.22)' }}
              >
                <span>{item.type}</span>
                <h4>{item.title}</h4>
                <p>{item.institution}</p>
                <strong>{item.status}</strong>
              </motion.article>
            ))}
          </div>

          <div className="education-column">
            <div className="education-column-title">
              <Award size={20} />
              <h3>{t.certificatesTitle}</h3>
            </div>
            {t.certificates.map((item, i) => (
              <motion.article
                className="education-card reveal reveal-stagger"
                key={`${item.title}-${item.issuer}`}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.18 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(var(--color-accent-rgb), 0.22)' }}
              >
                <span>{item.issuer}</span>
                <h4>{item.title}</h4>
                <strong>{item.status}</strong>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
