import ProjectCard from './ProjectCard';
import { projects, landingPages } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import type { Project } from '../types';
import './Projects.css';

const Projects = () => {
  const { language } = useLanguage();
  const t = text[language].projects;

  const displayedProjects: Project[] = [...projects, ...landingPages].slice(0, 6);

  return (
    <section id="projetos" className="section">
      <div className="container-wide">
        <p className="section-kicker reveal">{t.kicker}</p>
        <h2 className="section-title reveal">{t.title}</h2>
        <p className="section-subtitle reveal">
          {t.subtitle}
        </p>

        {displayedProjects.length > 0 ? (
          <div className="projects-showcase">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <p>{t.empty}</p>
          </div>
        )}

        <div className="projects-cta-wrapper reveal">
          <p className="projects-context">
            {t.context}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
