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

        <div className="stack-grid">
          {stackGroups.map((group, i) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                key={group.category}
                className="stack-card reveal reveal-stagger"
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.08 }}
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
