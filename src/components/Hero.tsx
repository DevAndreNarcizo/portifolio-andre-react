import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT, SPRING_TRANSITION } from '../constants/motion';
import HeroBackground from './HeroBackground';
import HeroRoleTyper from './HeroRoleTyper';
import HeroCTA from './HeroCTA';
import './Hero.css';

const Hero = () => {
  const { language } = useLanguage();
  const t = text[language].hero;
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const avatarX = useTransform(springX, [-300, 300], [8, -8]);
  const avatarY = useTransform(springY, [-300, 300], [8, -8]);
  const glowX = useTransform(springX, [-300, 300], [-40, 40]);
  const glowY = useTransform(springY, [-300, 300], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <HeroBackground />

      <motion.div
        className="hero-glow"
        style={{ x: glowX, y: glowY }}
      />

      <div className="container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-avatar-wrap"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.25 } },
            }}
          >
            <motion.img
              src="/Imagens/Foto 3x4.webp"
              alt="André Narcizo"
              className="hero-avatar"
              style={{ x: avatarX, y: avatarY }}
            />
          </motion.div>

          <motion.div
            className="hero-hello"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.35 } },
            }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={SPRING_TRANSITION}
            >
              HELLO
            </motion.span>
            <p>{language === 'pt' ? 'Eu sou' : "I'm"}</p>
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.45 } },
            }}
          >
            {t.title.split('').map((char, i) => (
              <motion.span
                key={i}
                className="hero-title-char"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.04,
                  ease: EASE_OUT,
                }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </motion.h1>

          <HeroRoleTyper />

          <motion.p
            className="hero-description hero-description--center"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.65 } },
            }}
          >
            {t.description}
          </motion.p>

          <motion.p
            className="hero-description-secondary hero-description--center"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.75 } },
            }}
          >
            {t.support}
          </motion.p>

          <HeroCTA
            projectsLabel={t.projects}
            contactLabel={t.contact}
            onScrollToProjects={() => scrollTo('projetos')}
            onScrollToContact={() => scrollTo('contato')}
            onScrollDown={() => scrollTo('sobre')}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
