import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isKnowledgePage = location.pathname.startsWith('/knowledge');

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
          André
        </Link>
        <ul className="menu">
          {!isKnowledgePage ? (
            <>
              <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre'); }}>About</a></li>
              <li><a href="#projetos" onClick={(e) => { e.preventDefault(); scrollTo('projetos'); }}>Projects</a></li>
              <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a></li>
              <li><a href="#contato" onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}>Contact</a></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/knowledge">Knowledge</Link></li>
            </>
          )}
          <li><Link to="/knowledge" className="knowledge-link">Knowledge Base</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

