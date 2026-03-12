import ProjectCard from './ProjectCard';
import { projects, contactInfo } from '../data';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title">Projetos de Impacto</h2>
        <p className="section-subtitle">
          Soluções reais entregues com foco em performance de negócio e experiência do usuário.
        </p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        
        <div className="projects-cta glass-card">
          <div className="cta-content">
            <h3 className="cta-title">Seu Próximo Passo Estratégico</h3>
            <p className="cta-description">
              Não sou apenas um desenvolvedor; sou o parceiro técnico que vai tirar sua ideia do papel com foco total em ROI e escalabilidade. 
              <strong> Tenho espaço limitado para novos projetos este mês.</strong>
            </p>
            <div className="cta-buttons">
              <a href={contactInfo.whatsappLink} className="btn btn-primary btn-large">
                <img 
                  src="/Imagens/whatsapp.png" 
                  alt="WhatsApp" 
                  width="28" 
                  height="28" 
                  style={{ marginRight: 12, borderRadius: '50%' }} 
                />
                Solicitar Orçamento Estratégico
              </a>
              <a href="#contato" className="btn btn-secondary btn-outline">Outras formas de contato</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
