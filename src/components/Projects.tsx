import ProjectCard from './ProjectCard';
import { projects } from '../data';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projetos" className="section">
      <div className="container-wide">
        <h2 className="section-title">Projetos selecionados</h2>
        <p className="section-subtitle">
          Cases reais que mostram como resolvo problemas de negócio com código.
        </p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
