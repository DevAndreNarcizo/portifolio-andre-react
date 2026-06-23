import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { contactInfo } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import { EASE_OUT } from '../constants/motion';
import './Contact.css';

const Contact = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const { language } = useLanguage();
  const t = text[language].contact;

  const handleEmailClick = async (e: React.MouseEvent) => {
    // Sem suporte a clipboard: deixa o mailto seguir o fluxo padrão.
    if (!navigator.clipboard) {
      return;
    }

    e.preventDefault();

    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Falha ao copiar (contexto inseguro/permissão): cai para o mailto.
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  return (
    <section id="contato" className="section">
      <div className="container">
        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="contact-info-side">
            <h2 className="section-title">{t.title}</h2>
            <p className="contact-description">
              {t.description}
            </p>

            <div className="contact-methods">
              <motion.a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="contact-method-card"
                whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(var(--color-accent-rgb), 0.35)' }}
              >
                <span className="method-label">WhatsApp</span>
                <span className="method-value">{contactInfo.whatsapp}</span>
              </motion.a>
              <motion.a
                href={`mailto:${contactInfo.email}`}
                onClick={handleEmailClick}
                className="contact-method-card"
                whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(var(--color-accent-rgb), 0.35)' }}
              >
                <span className="method-label">Email</span>
                <span className="method-value">{emailCopied ? t.copied : contactInfo.email}</span>
              </motion.a>
            </div>

            <div className="contact-social-links">
              {[
                { href: contactInfo.linkedin, label: 'LinkedIn', Icon: Linkedin },
                { href: contactInfo.github, label: 'GitHub', Icon: Github },
                { href: contactInfo.instagram, label: 'Instagram', Icon: Instagram },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2, color: 'var(--color-accent)' }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="contact-cta-side">
            <motion.a
              href={contactInfo.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {t.cta}
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </motion.a>
            <p className="cta-hint">
              {t.hint}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
