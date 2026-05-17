import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import type { Project } from '../types';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { language } = useLanguage();
  const t = text[language].projectCard;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 16 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  const imgRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const imgRotateY = useTransform(springX, [-0.5, 0.5], [-12, -2]);
  const imgOffsetX = useTransform(springX, [-0.5, 0.5], [6, -4]);
  const imgOffsetY = useTransform(springY, [-0.5, 0.5], [6, -4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const {
    title,
    image,
    liveLink,
    githubLink,
    tags,
    summary,
    tier
  } = project;
  const isEnterprise = tier === 'enterprise';
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      className={`project-card reveal reveal-stagger ${isEnterprise ? 'project-card--enterprise' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <motion.div
        className="project-card-glow"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      <div className="project-info">
        <span className="project-number">{t.project} {projectNumber}</span>
        <h3 className="project-card-title">{title}</h3>

        {summary && <p className="project-summary">{summary}</p>}

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
              <ExternalLink size={17} />
              <span>{t.viewSystem}</span>
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
              <Github size={17} />
              <span>{t.github}</span>
            </motion.a>
          )}
        </div>
      </div>

      <div className="project-visual">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="project-image"
            style={{
              rotateX: imgRotateX,
              rotateY: imgRotateY,
              x: imgOffsetX,
              y: imgOffsetY,
              transformPerspective: 1100,
            }}
          />
        ) : (
          <div className="project-image-placeholder">
            <Code size={42} />
            <span>{t.architecture}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
