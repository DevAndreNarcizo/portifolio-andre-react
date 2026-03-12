import { differentials } from '../data';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, Shield, Zap } from 'lucide-react';
import './Differences.css';

const iconMap: { [key: string]: LucideIcon } = {
  briefcase: Briefcase,
  shield: Shield,
  zap: Zap
};

const Differences = () => {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title">Por que meu processo é diferente?</h2>
        <p className="section-subtitle">
          Não sou apenas um executor. Minha abordagem foca em ser um diferencial estratégico para o seu negócio.
        </p>

        <div className="diff-grid">
          {differentials.map((diff, index) => {
            const Icon = iconMap[diff.icon];
            return (
              <div key={index} className="diff-card glass-card">
                <div className="diff-header">
                  <div className="diff-icon-circle">
                    <Icon size={24} />
                  </div>
                  <h3 className="diff-title">{diff.title}</h3>
                </div>
                <p className="diff-description">{diff.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Differences;
