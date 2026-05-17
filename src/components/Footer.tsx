import './Footer.css';
import { useLanguage } from '../i18n';
import { text } from '../content';

const Footer = () => {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const t = text[language].footer;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">Andre Narcizo</span>
            <p>{t.role}</p>
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
