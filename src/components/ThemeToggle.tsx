import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch {
      savedTheme = null;
    }
    if (savedTheme === 'light') {
      setIsLight(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isLight;
    setIsLight(newMode);
    document.body.classList.toggle('light-mode', newMode);

    try {
      localStorage.setItem('theme', newMode ? 'light' : 'dark');
    } catch {
      // Persistência indisponível: tema fica apenas na sessão atual.
    }
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label="Toggle Theme"
      title={isLight ? "Mudar para modo escuro" : "Mudar para modo claro"}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;
