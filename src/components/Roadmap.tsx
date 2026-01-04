import { ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { roadmapItems } from '../simple-data';
import './Roadmap.css';

const Roadmap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'learning': return '#007bff';
      case 'planned': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluido';
      case 'learning': return 'Estudando';
      case 'planned': return 'Planejado';
      default: return status;
    }
  };

  const groupedItems = roadmapItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof roadmapItems>);

  return (
    <div className="roadmap">
      <div className="roadmap-header">
        <h1>Roadmap de Aprendizado</h1>
        <p>Minha jornada de evolucao em tecnologia e desenvolvimento</p>
      </div>

      <div className="roadmap-stats">
        <div className="stat">
          <span className="stat-number">{roadmapItems.filter(i => i.status === 'completed').length}</span>
          <span className="stat-label">Concluidas</span>
        </div>
        <div className="stat">
          <span className="stat-number">{roadmapItems.filter(i => i.status === 'learning').length}</span>
          <span className="stat-label">Estudando</span>
        </div>
        <div className="stat">
          <span className="stat-number">{roadmapItems.filter(i => i.status === 'planned').length}</span>
          <span className="stat-label">Planejadas</span>
        </div>
      </div>

      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="timeline">
            {items.map((item) => (
              <div key={item.id} className="timeline-item">
                <div 
                  className="timeline-marker"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  <TrendingUp size={16} />
                </div>
                
                <div className="timeline-content">
                  <div className="item-header">
                    <h3 className="item-title">{item.tech}</h3>
                    <span 
                      className="item-status"
                      style={{ color: getStatusColor(item.status) }}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${item.progress}%`,
                        backgroundColor: getStatusColor(item.status)
                      }}
                    />
                  </div>
                  
                  <div className="item-meta">
                    <div className="item-dates">
                      <Calendar size={14} />
                      <span>
                        {new Date(item.startDate).toLocaleDateString('pt-BR')}
                        {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString('pt-BR')}`}
                      </span>
                    </div>
                    <span className="progress-text">{item.progress}%</span>
                  </div>
                  
                  {item.resources.length > 0 && (
                    <div className="item-resources">
                      <strong>Recursos:</strong>
                      <div className="resources-list">
                        {item.resources.map((resource, idx) => (
                          <a 
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-link"
                          >
                            <ExternalLink size={12} />
                            {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;