import { architecturePrinciples } from '../data';
import { Layers, Box, CheckCircle, GitBranch, Terminal, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './ArchitectureSection.css';

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  box: Box,
  'check-circle': CheckCircle,
  'git-branch': GitBranch,
  terminal: Terminal,
  'file-text': FileText,
};

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="section">
      <div className="container-wide">
        <h2 className="section-title">Engineering Principles</h2>
        <p className="section-subtitle">
          How I design, build, and deliver software — patterns I apply every day.
        </p>

        <div className="architecture-grid">
          {architecturePrinciples.map((principle) => {
            const Icon = iconMap[principle.icon];
            return (
              <div key={principle.title} className="architecture-card glass-card">
                <div className="architecture-card-header">
                  {Icon && (
                    <div className="architecture-icon">
                      <Icon size={20} />
                    </div>
                  )}
                  <h3 className="architecture-title">{principle.title}</h3>
                </div>
                <p className="architecture-description">{principle.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
