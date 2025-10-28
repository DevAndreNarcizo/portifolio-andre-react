import { projects } from '../data';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title">Projetos</h2>
        <p className="section-subtitle">
          Alguns dos projetos que desenvolvi ao longo da minha jornada
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

