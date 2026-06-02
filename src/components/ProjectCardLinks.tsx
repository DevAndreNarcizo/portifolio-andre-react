import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardLinksProps {
  liveLink?: string;
  githubLink?: string;
  viewSystemLabel: string;
  githubLabel: string;
}

/**
 * Renderiza os botoes de acao (live site / GitHub) do cartao de projeto.
 * @author André Narcizo
 */
const ProjectCardLinks = ({
  liveLink,
  githubLink,
  viewSystemLabel,
  githubLabel,
}: ProjectCardLinksProps) => (
  <div className="project-actions">
    {liveLink && (
      <motion.a
        href={liveLink}
        target="_blank"
        rel="noreferrer"
        className="project-action-btn primary"
        title="Live Site"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ExternalLink size={17} aria-hidden="true" />
        <span>{viewSystemLabel}</span>
      </motion.a>
    )}
    {!liveLink && githubLink && (
      <motion.a
        href={githubLink}
        target="_blank"
        rel="noreferrer"
        className="project-action-btn primary"
        title="GitHub"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Github size={17} aria-hidden="true" />
        <span>{githubLabel}</span>
      </motion.a>
    )}
  </div>
);

export default ProjectCardLinks;
