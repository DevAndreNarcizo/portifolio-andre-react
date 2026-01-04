import { Link } from 'react-router-dom';

const SimpleKnowledge = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Knowledge Base</h1>
      <p>Base de conhecimento em desenvolvimento...</p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        <Link 
          to="/knowledge/cheatsheets" 
          style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <h3>Git Cheatsheet</h3>
          <p>Comandos Git essenciais</p>
        </Link>
        
        <Link 
          to="/knowledge/tools" 
          style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <h3>Ferramentas</h3>
          <p>Curadoria de ferramentas uteis</p>
        </Link>
        
        <Link 
          to="/knowledge/roadmap" 
          style={{ 
            padding: '1rem', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <h3>Roadmap</h3>
          <p>Jornada de aprendizado</p>
        </Link>
      </div>
    </div>
  );
};

export default SimpleKnowledge;