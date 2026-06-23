import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';

/**
 * Efeito de máquina de escrever dos papéis profissionais.
 * Mantém o próprio estado para não re-renderizar a árvore do Hero a cada caractere.
 */
const HeroRoleTyper = () => {
  const { language } = useLanguage();
  const [roleText, setRoleText] = useState('');

  useEffect(() => {
    const roles = text[language].hero.roles;
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = roles[roleIdx];
      if (!isDeleting) {
        setRoleText(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          timeout = setTimeout(() => { isDeleting = true; type(); }, 1800);
          return;
        }
        timeout = setTimeout(type, 60 + Math.random() * 30);
      } else {
        setRoleText(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timeout = setTimeout(type, 300);
          return;
        }
        timeout = setTimeout(type, 25 + Math.random() * 15);
      }
    };

    timeout = setTimeout(type, 400);
    return () => clearTimeout(timeout);
  }, [language]);

  return (
    <motion.div
      className="hero-role-frame"
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.55 } },
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
};

export default HeroRoleTyper;
