import { motion } from 'framer-motion';

interface ProjectCardBadgesProps {
  tags: string[];
  isEnterprise: boolean;
}

/**
 * Renderiza as tags/badges de tecnologias do cartao de projeto.
 * @author André Narcizo
 */
const ProjectCardBadges = ({ tags, isEnterprise }: ProjectCardBadgesProps) => (
  <div className="project-tags">
    {tags.map((tag) => (
      <motion.span
        key={tag}
        className={`project-tag ${isEnterprise ? 'project-tag--enterprise' : ''}`}
        whileHover={{ scale: 1.08, y: -2 }}
      >
        {tag}
      </motion.span>
    ))}
  </div>
);

export default ProjectCardBadges;
