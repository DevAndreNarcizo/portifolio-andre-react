import { motion } from 'framer-motion';
import { contactInfo } from '../data';
import './WhatsAppFloating.css';

const WhatsAppFloating = () => {
  return (
    <motion.a
      href={contactInfo.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-floating"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      <img
        src="/Imagens/whatsapp.png"
        alt="WhatsApp"
        width="40"
        height="40"
      />
      <div className="whatsapp-tooltip">Solicitar Orçamento</div>
    </motion.a>
  );
};

export default WhatsAppFloating;
