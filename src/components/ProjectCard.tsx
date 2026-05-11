import { ExternalLink, Github, Code } from 'lucide-react';
import type { Project } from '../types';
import './ProjectCard.css';

type ProjectCardProps = Omit<Project, 'id'>;

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
  result,
  tier
}: ProjectCardProps) => {
  const isEnterprise = tier === 'enterprise';

  return (
    <div className={`project-card ${isEnterprise ? 'project-card--enterprise' : ''}`}>
      {image ? (
        <div className="project-image-container">
          <img src={image} alt={title} className="project-image" />
          <div className="project-overlay">
            <div className="project-actions">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noreferrer" className="project-action-btn primary" title="Live Site">
                  <ExternalLink size={18} />
                  <span>Site</span>
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer" className="project-action-btn secondary" title="GitHub">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="project-image-placeholder">
          <Code size={32} />
          <span>Architecture Project</span>
          <div className="project-actions">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="project-action-btn primary" title="GitHub">
                <Github size={18} />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      )}

      <div className="project-info">
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className={`project-tag ${isEnterprise ? 'project-tag--enterprise' : ''}`}>{tag}</span>
          ))}
        </div>
        <h3 className="project-card-title">{title}</h3>

        {summary && <p className="project-summary">{summary}</p>}

        <div className="project-details">
          {stack && (
            <div className="detail-item">
              <span className="detail-label">Stack</span>
              <p>{stack}</p>
            </div>
          )}
          {role && (
            <div className="detail-item">
              <span className="detail-label">My Role</span>
              <p>{role}</p>
            </div>
          )}
          {problem && (
            <div className="detail-item">
              <span className="detail-label">Problem</span>
              <p>{problem}</p>
            </div>
          )}
          {solution && (
            <div className="detail-item">
              <span className="detail-label">Solution</span>
              <p>{solution}</p>
            </div>
          )}
          {result && (
            <div className="detail-item">
              <span className="detail-label result">Outcome</span>
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
