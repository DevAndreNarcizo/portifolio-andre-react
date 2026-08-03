import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { contactInfo } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = text[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navItems = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.about, id: 'sobre' },
    { label: t.nav.experience, id: 'experiencia' },
    { label: t.nav.stack, id: 'stack' },
    { label: t.nav.education, id: 'formacao' },
    { label: t.nav.projects, id: 'projetos' },
    { label: t.nav.contact, id: 'contato' },
  ];

  return (
    <motion.header
      className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.2 }}
    >
      <nav className="container-wide">
        <div className="header-socials">
          <motion.a href={contactInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" whileHover={{ y: -2, color: 'var(--color-accent)' }}>
            <Github size={19} />
          </motion.a>
          <motion.a href={contactInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" whileHover={{ y: -2, color: 'var(--color-accent)' }}>
            <Linkedin size={19} />
          </motion.a>
        </div>

        <a
          href="#hero"
          className="logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          André Narcizo
        </a>

        <div className="nav-right">
          <ul id="primary-navigation" className={`menu ${mobileOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.a
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
            <li className="mobile-language-item">
              <button
                type="button"
                onClick={() => {
                  setLanguage(language === 'pt' ? 'en' : 'pt');
                  setMobileOpen(false);
                }}
              >
                {language === 'pt' ? 'English' : 'Português'}
              </button>
            </li>
          </ul>

          <div className="language-toggle" aria-label={language === 'pt' ? 'Selecionar idioma' : 'Select language'}>
            <span>PT</span>
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              type="button"
              aria-label={language === 'pt' ? 'Mudar para ingles' : 'Switch to Portuguese'}
            >
            </button>
            <span>EN</span>
          </div>

          <ThemeToggle />

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
