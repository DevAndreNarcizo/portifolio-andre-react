import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './Projects.css';

const Projects = () => {
  const { language } = useLanguage();
  const t = text[language].projects;

  return (
    <section id="projetos" className="section">
      <div className="container-wide">
        <motion.p
          data-build
          className="section-kicker"
        >
          {t.kicker}
        </motion.p>
        <motion.h2
          data-build
          className="section-title"
        >
          {t.title}
        </motion.h2>
        <motion.p
          data-build
          className="section-subtitle"
        >
          {t.subtitle}
        </motion.p>

        {featuredProjects.length > 0 ? (
          <div className="projects-showcase">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <p>{t.empty}</p>
          </div>
        )}

        <motion.div
          data-build
          className="projects-cta-wrapper"
        >
          <p className="projects-context">
            {t.context}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
