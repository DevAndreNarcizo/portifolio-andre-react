import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {year} André. All rights reserved.</p>
        <p className="footer-note">Built with React + TypeScript + Vite</p>
      </div>
    </footer>
  );
};

export default Footer;

