import { useState } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import './CommandCard.css';

interface CommandCardProps {
  command: string;
  description: string;
  example?: string;
  warning?: string;
  tags?: string[];
  copyable?: boolean;
}

const CommandCard = ({ 
  command, 
  description, 
  example, 
  warning, 
  tags = [], 
  copyable = true 
}: CommandCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className={`command-card ${warning ? 'warning' : ''}`}>
      <div className="command-header">
        <code className="command">{command}</code>
        {copyable && (
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copiar comando"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
      </div>
      
      <p className="description">{description}</p>
      
      {example && (
        <div className="example">
          <strong>Exemplo:</strong> <code>{example}</code>
        </div>
      )}
      
      {warning && (
        <div className="warning-box">
          <AlertTriangle size={16} />
          <span>{warning}</span>
        </div>
      )}
      
      {tags.length > 0 && (
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandCard;