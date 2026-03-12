import { Mail, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { contactInfo } from '../data';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    stage: 'ideia',
    budget: 'R$ 2k - 5k'
  });

  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(contactInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Olá André!\n\nMeu nome é *${formData.name}*.\nQuero falar sobre meu projeto: _${formData.project}_\n\n*Estágio atual:* ${formData.stage}\n*Orçamento estimado:* ${formData.budget}`
    );
    window.open(`https://wa.me/5562993382881?text=${message}`, '_blank');
  };

  return (
    <section id="contato" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-side">
            <h2 className="contact-title">Vamos impulsionar seu produto?</h2>
            <p className="contact-description">
              Se você busca um parceiro estratégico para transformar sua ideia em realidade técnica de alto nível, entre em contato.
            </p>
            
            <div className="contact-methods">
              <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" className="contact-method-card glass-card">
                <img 
                  src="/Imagens/whatsapp.png" 
                  alt="WhatsApp" 
                  width="32" 
                  height="32" 
                  className="method-icon"
                  style={{ borderRadius: '50%' }}
                />
                <div>
                  <span className="method-label">WhatsApp</span>
                  <span className="method-value">{contactInfo.whatsapp}</span>
                </div>
              </a>
              <a href={`mailto:${contactInfo.email}`} onClick={handleEmailClick} className="contact-method-card glass-card">
                <Mail size={24} className="method-icon" />
                <div>
                  <span className="method-label">Email</span>
                  <span className="method-value">{emailCopied ? 'Copiado para o clipboard!' : contactInfo.email}</span>
                </div>
              </a>
            </div>

            <div className="contact-social-links">
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer"><Github size={20} /></a>
              <a href={contactInfo.instagram} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="contact-form-side glass-card">
            <h3 className="form-title">Qualificação de Projeto</h3>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Seu Nome</label>
                  <input 
                    type="text" 
                    placeholder="Como devo te chamar?" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Sobre o Projeto</label>
                <textarea 
                  placeholder="Descreva brevemente seu desafio técnico..." 
                  rows={4} 
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Estágio Atual</label>
                  <select 
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                  >
                    <option value="ideia">Apenas Ideia</option>
                    <option value="mvp">MVP em andamento</option>
                    <option value="operacao">Produto em operação</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Orçamento Estimado</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  >
                    <option value="R$ 500,00 - R$ 2.000,00">R$ 500,00 - R$ 2.000,00</option>
                    <option value="R$ 2.000,00 - R$ 5.000,00">R$ 2.000,00 - R$ 5.000,00</option>
                    <option value="R$ 5.000,00 - R$ 10.000,00">R$ 5.000,00 - R$ 10.000,00</option>
                    <option value="R$ 10.000,00 - R$ 20.000,00">R$ 10.000,00 - R$ 20.000,00</option>
                    <option value="Acima de R$ 20.000,00">Acima de R$ 20.000,00</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Enviar via WhatsApp
                <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
