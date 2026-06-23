import { motion } from 'framer-motion';
import { ArrowDown, Code2, ExternalLink } from 'lucide-react';
import { EASE_OUT } from '../constants/motion';

interface HeroCTAProps {
  projectsLabel: string;
  contactLabel: string;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onScrollDown: () => void;
}

const HeroCTA = ({
  projectsLabel,
  contactLabel,
  onScrollToProjects,
  onScrollToContact,
  onScrollDown,
}: HeroCTAProps) => (
  <>
    <motion.div
      className="hero-cta"
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.85 } },
      }}
    >
      <motion.button
        className="btn btn-primary"
        onClick={onScrollToProjects}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <Code2 size={16} style={{ marginRight: 8 }} aria-hidden="true" />
        {projectsLabel}
      </motion.button>
      <motion.button
        className="btn btn-secondary"
        onClick={onScrollToContact}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <ExternalLink size={16} style={{ marginRight: 6 }} aria-hidden="true" />
        {contactLabel}
      </motion.button>
    </motion.div>

    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.95 } },
      }}
    >
      <motion.button
        className="hero-scroll"
        onClick={onScrollDown}
        aria-label="Rolar para baixo"
        whileHover={{ y: 4 }}
      >
        <ArrowDown size={24} aria-hidden="true" />
      </motion.button>
    </motion.div>
  </>
);

export default HeroCTA;
