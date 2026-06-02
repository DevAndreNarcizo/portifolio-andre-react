import { motion } from 'framer-motion';

interface HeroRoleTyperProps {
  roleText: string;
  easeOut: readonly [number, number, number, number];
}

const HeroRoleTyper = ({ roleText, easeOut }: HeroRoleTyperProps) => (
  <motion.div
    className="hero-role-frame"
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.55 } },
    }}
  >
    <span className="corner corner-tl" />
    <span className="corner corner-tr" />
    <span className="corner corner-bl" />
    <span className="corner corner-br" />
    <p className="hero-role" aria-live="polite" aria-label="Papel profissional em animação">
      {roleText}
      <motion.span
        className="hero-role-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
        aria-hidden="true"
      >
        |
      </motion.span>
    </p>
  </motion.div>
);

export default HeroRoleTyper;
