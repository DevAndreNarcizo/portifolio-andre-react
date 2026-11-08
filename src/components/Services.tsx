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
        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                data-build
                key={service.id}
                className="service-card"
                whileHover={{ y: -6, borderColor: 'rgba(var(--color-accent-rgb), 0.3)' }}
              >
                <div className="service-icon-wrapper">
                  {Icon && <Icon size={24} />}
                </div>
                <h3>{service.title[language]}</h3>
                <p>{service.description[language]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
