import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {year} André. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

