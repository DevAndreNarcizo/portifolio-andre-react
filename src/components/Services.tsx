import { motion } from 'framer-motion';
import { Layout, Layers, Smartphone, Settings } from 'lucide-react';
import { services } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './Services.css';

import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  layers: Layers,
  smartphone: Smartphone,
  settings: Settings,
};

const Services = () => {
  const { language } = useLanguage();
  const t = text[language].services;

  return (
    <section id="servicos" className="section">
      <div className="container-wide">
        <motion.h2
          className="section-title reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          className="section-subtitle reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {t.subtitle}
        </motion.p>
        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                className="service-card reveal reveal-stagger"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }}
              >
                <div className="service-icon-wrapper">
                  {Icon && <Icon size={24} />}
                </div>
                <h3>{language === 'pt' ? service.title : service.titleEn}</h3>
                <p>{language === 'pt' ? service.description : service.descriptionEn}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
