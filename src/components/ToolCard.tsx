import { ExternalLink, Star } from 'lucide-react';
import './ToolCard.css';

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
  rating?: number;
  free: boolean;
  notes?: string;
}

const ToolCard = ({ 
  name, 
  description, 
  category, 
  url, 
  tags, 
  rating, 
  free, 
  notes 
}: ToolCardProps) => {
  return (
    <div className="tool-card">
      <div className="tool-header">
        <div>
          <h3 className="tool-name">{name}</h3>
          <span className="tool-category">{category}</span>
        </div>
        <div className="tool-meta">
          {rating && (
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < rating ? 'star-filled' : 'star-empty'} 
                />
              ))}
            </div>
          )}
          <span className={`price ${free ? 'free' : 'paid'}`}>
            {free ? 'Grátis' : 'Pago'}
          </span>
        </div>
      </div>
      
      <p className="tool-description">{description}</p>
      
      {notes && (
        <div className="tool-notes">
          <strong>Notas:</strong> {notes}
        </div>
      )}
      
      <div className="tool-footer">
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="tool-link"
        >
          <ExternalLink size={16} />
          Acessar
        </a>
      </div>
    </div>
  );
};

export default ToolCard;