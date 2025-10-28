import type { Project } from '../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <a 
            href={project.link || '#'} 
            target="_blank" 
            rel="noreferrer"
            className="project-link"
          >
            Ver Projeto
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        {project.description && <p>{project.description}</p>}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

