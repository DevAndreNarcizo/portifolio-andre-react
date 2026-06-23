import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';
import './Projects.css';

const Projects = () => {
  const { language } = useLanguage();
  const t = text[language].projects;

  return (
    <section id="projetos" className="section">
      <div className="container-wide">
        <motion.p
          className="section-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {t.kicker}
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.14 }}
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
          className="projects-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
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
