import { Link } from 'react-router-dom';
import { BookOpen, Code, Wrench, Map, FileText, Lightbulb } from 'lucide-react';
import SEO from './SEO';
import './KnowledgeHome.css';

const KnowledgeHome = () => {
  const sections = [
    {
      title: 'Cheatsheets',
      description: 'Comandos essenciais organizados por tecnologia',
      icon: <BookOpen size={24} />,
      path: '/knowledge/cheatsheets',
      count: '3 sheets'
    },
    {
      title: 'Roadmap',
      description: 'Minha jornada de aprendizado em tecnologia',
      icon: <Map size={24} />,
      path: '/knowledge/roadmap',
      count: '10 tecnologias'
    },
    {
      title: 'Ferramentas',
      description: 'Curadoria de ferramentas e extensoes uteis',
      icon: <Wrench size={24} />,
      path: '/knowledge/tools',
      count: '25+ tools'
    },
    {
      title: 'Snippets',
      description: 'Trechos de codigo reutilizaveis',
      icon: <Code size={24} />,
      path: '/knowledge/snippets',
      count: '15 snippets'
    },
    {
      title: 'Arquitetura',
      description: 'ADRs e decisoes tecnicas dos projetos',
      icon: <FileText size={24} />,
      path: '/knowledge/architecture',
      count: '5 ADRs'
    },
    {
      title: 'Guias',
      description: 'Tutoriais e guias autorais',
      icon: <Lightbulb size={24} />,
      path: '/knowledge/guides',
      count: 'Em breve'
    }
  ];

  return (
    <div className="knowledge-home">
      <SEO 
        title="Knowledge Base - André Narcizo | Cheatsheets, Ferramentas e Guias"
        description="Base de conhecimento completa com cheatsheets de Git, SQL, Docker, VS Code, ferramentas curadas e guias de desenvolvimento."
        keywords="knowledge base, cheatsheets, git, sql, docker, vscode, ferramentas desenvolvimento, guias programação"
      />
      <div className="hero-section">
        <h1>Knowledge Base</h1>
        <p>
          Centralizando conhecimento, ferramentas e recursos para desenvolvimento.
          Uma base de conhecimento pessoal em constante evolucao.
        </p>
      </div>

      <div className="sections-grid">
        {sections.map((section) => (
          <Link 
            key={section.path} 
            to={section.path} 
            className="section-card"
          >
            <div className="section-icon">
              {section.icon}
            </div>
            <div className="section-content">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <span className="section-count">{section.count}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="stats-section">
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Comandos</span>
        </div>
        <div className="stat">
          <span className="stat-number">25+</span>
          <span className="stat-label">Ferramentas</span>
        </div>
        <div className="stat">
          <span className="stat-number">10</span>
          <span className="stat-label">Tecnologias</span>
        </div>
        <div className="stat">
          <span className="stat-number">15+</span>
          <span className="stat-label">Snippets</span>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHome;