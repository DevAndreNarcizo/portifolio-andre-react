import { Layout, Layers, Smartphone, Settings, ShoppingCart } from 'lucide-react';
import { services } from '../data';
import './Services.css';

import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  layers: Layers,
  smartphone: Smartphone,
  settings: Settings,
  'shopping-cart': ShoppingCart,
};

const Services = () => {
  return (
    <section id="servicos" className="section">
      <div className="section-background">
        <div className="section-glow"></div>
        <div className="section-grid"></div>
      </div>
      <div className="container">
        <h2 className="section-title">Como posso ajudar seu negócio</h2>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card glass-card">
                <div className="service-icon-wrapper">
                  {Icon && <Icon size={32} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
