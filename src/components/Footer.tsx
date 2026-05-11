import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">Andre Narcizo</span>
            <p>Full-Stack Developer — Goiania, Brazil</p>
          </div>

          <div className="footer-right">
            <p>&copy; {year} Andre Narcizo</p>
            <p className="footer-stack">Laravel &middot; Angular &middot; React &middot; Flutter &middot; Docker</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
