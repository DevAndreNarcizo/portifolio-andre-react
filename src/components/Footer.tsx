import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {year} André. Todos os direitos reservados.</p>
        <p className="footer-note">Construído com React + TypeScript + Vite</p>
      </div>
    </footer>
  );
};

export default Footer;

