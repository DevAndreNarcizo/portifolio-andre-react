import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './Education.css';

const Education = () => {
  const { language } = useLanguage();
  const t = text[language].education;

  return (
    <section id="formacao" className="section education-section">
      <div className="container-wide">
        <motion.p
          data-build
          className="section-kicker"
        >
          {t.kicker}
        </motion.p>
        <motion.h2
          data-build
          className="section-title"
        >
          {t.title}
        </motion.h2>
        <motion.p
          data-build
          className="section-subtitle"
        >
          {t.subtitle}
        </motion.p>

        <div className="education-grid">
          <div className="education-column">
            <div className="education-column-title">
              <GraduationCap size={20} />
              <h3>{t.educationTitle}</h3>
            </div>
            {t.items.map((item) => (
              <motion.article
                data-build
                className="education-card"
                key={`${item.title}-${item.institution}`}
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
            {t.certificates.map((item) => (
              <motion.article
                data-build
                className="education-card"
                key={`${item.title}-${item.issuer}`}
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
