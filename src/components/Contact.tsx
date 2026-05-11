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
            <h2 className="section-title">Let's work together</h2>
            <p className="contact-description">
              Got an idea, system, or process that needs to move beyond spreadsheets and guesswork?
              I can help turn the problem into scope, architecture, and delivery.
            </p>

            <div className="contact-methods">
              <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="contact-method-card">
                <span className="method-label">WhatsApp</span>
                <span className="method-value">{contactInfo.whatsapp}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} onClick={handleEmailClick} className="contact-method-card">
                <span className="method-label">Email</span>
                <span className="method-value">{emailCopied ? 'Copied!' : contactInfo.email}</span>
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
              Let's talk about a project
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </a>
            <p className="cta-hint">
              I usually respond within 24h on weekdays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
