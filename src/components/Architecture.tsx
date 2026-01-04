import { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import { adrs } from '../adrs-data';
import './Architecture.css';

const Architecture = () => {
  const [selectedAdr, setSelectedAdr] = useState<string | null>(null);

  const currentAdr = selectedAdr ? adrs.find(adr => adr.id === selectedAdr) : null;

  if (currentAdr) {
    return (
      <div className="architecture">
        <div className="adr-detail">
          <button 
            className="back-btn"
            onClick={() => setSelectedAdr(null)}
          >
            ← Voltar para ADRs
          </button>
          
          <div className="adr-header">
            <h1>{currentAdr.title}</h1>
            <div className="adr-meta">
              <span className={`status ${currentAdr.status.toLowerCase()}`}>
                {currentAdr.status}
              </span>
              <span className="date">
                <Calendar size={16} />
                {new Date(currentAdr.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          <div className="adr-content">
            <section className="adr-section">
              <h2>Contexto</h2>
              <p>{currentAdr.context}</p>
            </section>

            <section className="adr-section">
              <h2>Problema</h2>
              <p>{currentAdr.problem}</p>
            </section>

            <section className="adr-section">
              <h2>Decisões Consideradas</h2>
              <ul>
                {currentAdr.decisions.map((decision, index) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </section>

            <section className="adr-section">
              <h2>Decisão</h2>
              <p className="decision-highlight">{currentAdr.decision}</p>
            </section>

            <section className="adr-section">
              <h2>Justificativa</h2>
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: currentAdr.justification.replace(/\n/g, '<br>') }}
              />
            </section>

            <section className="adr-section">
              <h2>Consequências</h2>
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: currentAdr.consequences.replace(/\n/g, '<br>') }}
              />
            </section>

            <div className="adr-tags">
              {currentAdr.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="architecture">
      <div className="architecture-header">
        <h1>Architecture Decision Records</h1>
        <p>Documentacao de decisoes arquiteturais importantes dos projetos</p>
      </div>

      <div className="adrs-grid">
        {adrs.map(adr => (
          <div 
            key={adr.id} 
            className="adr-card"
            onClick={() => setSelectedAdr(adr.id)}
          >
            <div className="adr-card-header">
              <h3 className="adr-title">{adr.title}</h3>
              <span className={`status ${adr.status.toLowerCase()}`}>
                {adr.status}
              </span>
            </div>
            
            <p className="adr-problem">{adr.problem}</p>
            
            <div className="adr-decision">
              <strong>Decisao:</strong> {adr.decision}
            </div>
            
            <div className="adr-meta">
              <span className="category">
                <FileText size={14} />
                {adr.category}
              </span>
              <span className="date">
                <Calendar size={14} />
                {new Date(adr.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            <div className="adr-tags">
              {adr.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
              {adr.tags.length > 3 && (
                <span className="tag-more">+{adr.tags.length - 3}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="adr-info">
        <h2>O que são ADRs?</h2>
        <p>
          Architecture Decision Records (ADRs) são documentos que capturam decisões 
          arquiteturais importantes, incluindo o contexto, as alternativas consideradas 
          e as consequências da decisão tomada.
        </p>
        
        <div className="adr-benefits">
          <h3>Benefícios dos ADRs:</h3>
          <ul>
            <li>Documentam o raciocínio por trás das decisões</li>
            <li>Ajudam novos membros da equipe a entender o projeto</li>
            <li>Facilitam a revisão e evolução da arquitetura</li>
            <li>Evitam repetir discussões já resolvidas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Architecture;