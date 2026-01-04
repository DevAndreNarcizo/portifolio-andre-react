import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ToolCard from './ToolCard';
import { tools } from '../simple-data';
import './Tools.css';

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const categories = ['all', ...new Set(tools.map(tool => tool.category))];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesFree = !showFreeOnly || tool.free;
    
    return matchesSearch && matchesCategory && matchesFree;
  });

  return (
    <div className="tools">
      <div className="tools-header">
        <h1>Ferramentas & Recursos</h1>
        <p>Curadoria de ferramentas, extensoes e recursos uteis para desenvolvimento</p>
      </div>

      <div className="tools-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar ferramentas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Todas' : category}
              </button>
            ))}
          </div>

          <label className="free-filter">
            <input
              type="checkbox"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
            />
            <Filter size={16} />
            Apenas gratuitas
          </label>
        </div>
      </div>

      <div className="tools-grid">
        {filteredTools.map(tool => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            description={tool.description}
            category={tool.category}
            url={tool.url}
            tags={tool.tags}
            rating={tool.rating}
            free={tool.free}
            notes={tool.notes}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="no-results">
          <p>Nenhuma ferramenta encontrada com os filtros aplicados</p>
        </div>
      )}

      <div className="tools-stats">
        <div className="stat">
          <span className="stat-number">{tools.length}</span>
          <span className="stat-label">Total de ferramentas</span>
        </div>
        <div className="stat">
          <span className="stat-number">{tools.filter(t => t.free).length}</span>
          <span className="stat-label">Gratuitas</span>
        </div>
        <div className="stat">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Categorias</span>
        </div>
      </div>
    </div>
  );
};

export default Tools;