import { contactInfo } from '../data';
import './WhatsAppFloating.css';

const WhatsAppFloating = () => {
  return (
    <a 
      href={contactInfo.whatsappLink} 
      target="_blank" 
      rel="noreferrer" 
      className="whatsapp-floating"
      aria-label="Falar no WhatsApp"
    >
      <img 
        src="/Imagens/whatsapp.png" 
        alt="WhatsApp" 
        width="40" 
        height="40" 
      />
      <div className="whatsapp-tooltip">Solicitar Orçamento</div>
    </a>
  );
};

export default WhatsAppFloating;
