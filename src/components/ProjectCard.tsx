import { ExternalLink, Github } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  summary?: string;
  stack?: string;
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
}

const ProjectCard = ({
  title,
  image,
  liveLink,
  githubLink,
  tags,
  summary,
  stack,
  role,
  problem,
  solution,
  result
}: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-actions">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noreferrer" className="project-action-btn primary" title="Acessar o Site">
                <ExternalLink size={18} />
                <span>Site</span>
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="project-action-btn secondary" title="Ver no GitHub">
                <Github size={18} />
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
        
        {summary && <p className="project-summary">{summary}</p>}
        
        <div className="project-details">
          {stack && (
            <div className="detail-item">
              <span className="detail-label">Stack:</span>
              <p>{stack}</p>
            </div>
          )}
          {role && (
            <div className="detail-item">
              <span className="detail-label">Meu papel:</span>
              <p>{role}</p>
            </div>
          )}
          {problem && (
            <div className="detail-item">
              <span className="detail-label">Problema:</span>
              <p>{problem}</p>
            </div>
          )}
          {solution && (
            <div className="detail-item">
              <span className="detail-label">Solução:</span>
              <p>{solution}</p>
            </div>
          )}
          {result && (
            <div className="detail-item">
              <span className="detail-label result">Aprendizado:</span>
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
