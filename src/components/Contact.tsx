import { Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { contactInfo } from '../data';
import './Contact.css';

const Contact = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(contactInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contato" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-side">
            <h2 className="section-title">Contato</h2>
            <p className="contact-description">
              Tem uma ideia, sistema ou processo que precisa sair do improviso?
              Me chame para conversar. Posso ajudar a transformar o problema em escopo,
              arquitetura e entrega.
            </p>
            
            <div className="contact-methods">
              <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="contact-method-card">
                <span className="method-label">WhatsApp</span>
                <span className="method-value">{contactInfo.whatsapp}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} onClick={handleEmailClick} className="contact-method-card">
                <span className="method-label">Email</span>
                <span className="method-value">{emailCopied ? 'Copiado!' : contactInfo.email}</span>
              </a>
            </div>

            <div className="contact-social-links">
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={contactInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="contact-cta-side">
            <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
              Falar sobre um projeto
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </a>
            <p className="cta-hint">
              Respondo em até 24h durante a semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
