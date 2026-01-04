import { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { snippets } from '../expanded-snippets';
import './Snippets.css';

const Snippets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', ...new Set(snippets.map(snippet => snippet.category))];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className="snippets">
      <div className="snippets-header">
        <h1>Code Snippets</h1>
        <p>Trechos de codigo reutilizaveis para acelerar o desenvolvimento</p>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="snippets-grid">
        {filteredSnippets.map(snippet => (
          <div key={snippet.id} className="snippet-card">
            <div className="snippet-header">
              <div>
                <h3 className="snippet-title">{snippet.title}</h3>
                <span className="snippet-language">{snippet.language}</span>
              </div>
              <button
                className={`copy-btn ${copiedId === snippet.id ? 'copied' : ''}`}
                onClick={() => handleCopy(snippet.code, snippet.id)}
                title="Copiar codigo"
              >
                {copiedId === snippet.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            <p className="snippet-description">{snippet.description}</p>
            
            <div className="code-block">
              <pre>
                <code className={`language-${snippet.language}`}>
                  {snippet.code}
                </code>
              </pre>
            </div>
            
            <div className="snippet-tags">
              {snippet.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="no-results">
          <p>Nenhum snippet encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Snippets;