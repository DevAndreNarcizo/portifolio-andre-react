import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">
              <span style={{ color: 'var(--color-accent)' }}>Dev.</span> André Narcizo
            </span>
            <p>Construindo produtos digitais com engenharia de alto nível.</p>
          </div>
          
          <div className="footer-right">
            <p>© {year} André Narcizo. Todos os direitos reservados.</p>
            <p className="footer-location">Goiânia, Brasil 🇧🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
