import { ArrowRight } from 'lucide-react';
import { contactInfo } from '../data';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(contactInfo.whatsappLink, '_blank');
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-glow"></div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot"></span>
            Disponível para 2 projetos em paralelo
          </div>
          
          <h1 className="hero-title">
            Transformo problemas de negócio em 
            <span className="text-gradient"> produtos digitais</span> de alta performance.
          </h1>
          
          <p className="hero-description">
            Engenharia Full Stack Pleno focada em entregar sistemas escaláveis, 
            sites ultra-rápidos e soluções que pensam como o seu negócio.
          </p>
          
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('contato')}>
              Solicitar Orçamento
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
            <button className="btn btn-secondary" onClick={openWhatsApp}>
              <img 
                src="/Imagens/whatsapp.png" 
                alt="WhatsApp" 
                width="32" 
                height="32" 
                style={{ marginRight: 10, borderRadius: '50%' }} 
              />
              Falar no WhatsApp
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">+ de 2 anos</span>
              <span className="stat-label">Experiência</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Foco em Resultado</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">Pleno</span>
              <span className="stat-label">Full Stack Eng.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
