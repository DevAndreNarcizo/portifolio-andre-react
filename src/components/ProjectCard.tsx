import { ExternalLink, Github } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  description?: string;
}

const ProjectCard = ({ title, image, liveLink, githubLink, tags, description }: ProjectCardProps) => {
  // Parse description for Problem, Solution, Result
  const parts = description ? description.split(/\s*(?:Problema:|Solução:|Resultado:)\s*/).filter(Boolean) : [];
  
  return (
    <div className="project-card glass-card">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-actions">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noreferrer" className="project-action-btn primary" title="Acessar o Site">
                <ExternalLink size={20} />
                <span>Site</span>
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="project-action-btn secondary" title="Ver no GitHub">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="project-info">
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <h3 className="project-card-title">{title}</h3>
        
        <div className="project-details">
          {parts.length >= 3 ? (
            <>
              <div className="detail-item">
                <span className="detail-label">Problema:</span>
                <p>{parts[0]}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Solução:</span>
                <p>{parts[1]}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label result">Resultado:</span>
                <p>{parts[2]}</p>
              </div>
            </>
          ) : (
            <p className="project-fallback-desc">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
