import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container">
        <Link to="/" className="logo">
          <span style={{ color: 'var(--color-accent)' }}>Dev.</span> André Narcizo
        </Link>
        
        <div className="nav-right">
          <ul className="menu">
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre'); }}>Sobre</a></li>
            <li><a href="#projetos" onClick={(e) => { e.preventDefault(); scrollTo('projetos'); }}>Projetos</a></li>
            <li><a href="#contato" onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}>Contato</a></li>
          </ul>
          
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;

