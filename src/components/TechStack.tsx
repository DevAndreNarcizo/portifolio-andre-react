import { stackGroups } from '../data';
import { Server, Layout, Smartphone, Database, Terminal, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
  return (
    <section id="stack" className="section bg-alt">
      <div className="container-wide">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          Technologies I use daily to build complete systems — from database to deployment.
        </p>

        <div className="stack-grid">
          {stackGroups.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <div key={group.category} className="stack-card">
                <div className="stack-card-header">
                  {Icon && <Icon size={18} className="stack-icon" />}
                  <h3 className="stack-category">{group.category}</h3>
                </div>
                <p className="stack-items">{group.items}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
