import { motion } from 'framer-motion';
import { stackGroups } from '../data';
import { Server, Layout, Smartphone, Database, Terminal, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './TechStack.css';

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  layout: Layout,
  smartphone: Smartphone,
  database: Database,
  terminal: Terminal,
  layers: Layers,
};

const TechStack = () => {
  const { language } = useLanguage();
  const t = text[language].stack;

  return (
    <section id="stack" className="section bg-alt">
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

        <div className="stack-grid">
          {stackGroups.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                data-build
                key={group.category}
                className="stack-card"
                whileHover={{ y: -4, borderColor: 'rgba(var(--color-accent-rgb), 0.25)' }}
              >
                <div className="stack-card-header">
                  {Icon && <Icon size={18} className="stack-icon" />}
                  <h3 className="stack-category">{group.category}</h3>
                </div>
                <p className="stack-items">{group.items}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
