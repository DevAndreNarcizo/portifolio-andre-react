import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">André Narcizo</span>
            <p>Full-Stack Developer em Goiânia-GO.</p>
          </div>
          
          <div className="footer-right">
            <p>© {year} André Narcizo</p>
            <p className="footer-location">Goiânia, Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
