import { useState } from 'react';
import { Search } from 'lucide-react';
import CommandCard from './CommandCard';
import SEO from './SEO';
import { cheatSheets } from '../simple-data';
import './CheatSheets.css';

const CheatSheets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSheet, setSelectedSheet] = useState('git');

  const currentSheet = cheatSheets.find(sheet => sheet.id === selectedSheet);
  const commands = currentSheet?.commands || [];

  const categories = ['all', ...new Set(commands.map(cmd => cmd.category))];

  const filteredCommands = commands.filter(command => {
    const matchesSearch = command.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="cheatsheets">
      <SEO 
        title={`${currentSheet?.title || 'Cheatsheets'} - Knowledge Base | André Narcizo`}
        description={`${currentSheet?.description || 'Cheatsheets de comandos essenciais'} - Comandos organizados com exemplos e copy-to-clipboard.`}
        keywords={`cheatsheet, ${currentSheet?.tags.join(', ') || 'comandos, desenvolvimento'}`}
      />
      <div className="cheatsheets-header">
        <h1>Cheatsheets</h1>
        <p>Comandos essenciais organizados por tecnologia</p>
      </div>

      <div className="sheet-selector">
        {cheatSheets.map(sheet => (
          <button
            key={sheet.id}
            className={`sheet-btn ${selectedSheet === sheet.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedSheet(sheet.id);
              setSelectedCategory('all');
              setSearchTerm('');
            }}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar comandos..."
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

      <div className="commands-grid">
        {filteredCommands.map(command => (
          <CommandCard
            key={command.id}
            command={command.command}
            description={command.description}
            example={command.example}
            warning={command.warning}
            tags={command.tags}
          />
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="no-results">
          <p>Nenhum comando encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CheatSheets;