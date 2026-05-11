import { Layout, Layers, Smartphone, Settings } from 'lucide-react';
import { services } from '../data';
import './Services.css';

import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  layers: Layers,
  smartphone: Smartphone,
  settings: Settings,
};

const Services = () => {
  return (
    <section id="servicos" className="section">
      <div className="container-wide">
        <h2 className="section-title">What I Build</h2>
        <p className="section-subtitle">
          End-to-end delivery — from architecture and database to frontend and deployment.
        </p>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  {Icon && <Icon size={24} />}
                </div>
                <h3>{service.titleEn}</h3>
                <p>{service.descriptionEn}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
