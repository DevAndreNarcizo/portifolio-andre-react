import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { label: 'Projects', id: 'projetos' },
    { label: 'Architecture', id: 'architecture' },
    { label: 'Notes', id: 'notas' },
    { label: 'Stack', id: 'stack' },
    { label: 'Contact', id: 'contato' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container">
        <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Andre Narcizo
        </Link>

        <div className="nav-right">
          <ul className={`menu ${mobileOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
