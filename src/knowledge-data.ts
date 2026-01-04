import { Command, Tool, RoadmapItem, Snippet, CheatSheet } from './knowledge-types';

export const gitCommands: Command[] = [
  {
    id: 'git-init',
    command: 'git init',
    description: 'Inicializar repositorio Git',
    example: 'git init meu-projeto',
    tags: ['basico', 'inicializacao'],
    category: 'Basicos'
  },
  {
    id: 'git-clone',
    command: 'git clone <url>',
    description: 'Clonar repositorio remoto',
    example: 'git clone https://github.com/user/repo.git',
    tags: ['basico', 'clone'],
    category: 'Basicos'
  },
  {
    id: 'git-status',
    command: 'git status',
    description: 'Ver status dos arquivos',
    tags: ['basico', 'status'],
    category: 'Basicos'
  },
  {
    id: 'git-add',
    command: 'git add <arquivo>',
    description: 'Adicionar arquivo ao staging',
    example: 'git add . (todos os arquivos)',
    tags: ['basico', 'staging'],
    category: 'Basicos'
  },
  {
    id: 'git-commit',
    command: 'git commit -m "mensagem"',
    description: 'Fazer commit das mudancas',
    example: 'git commit -m "feat: adicionar nova funcionalidade"',
    tags: ['basico', 'commit'],
    category: 'Basicos'
  },
  {
    id: 'git-push',
    command: 'git push origin <branch>',
    description: 'Enviar commits para repositorio remoto',
    example: 'git push origin main',
    tags: ['basico', 'remote'],
    category: 'Remote'
  },
  {
    id: 'git-pull',
    command: 'git pull',
    description: 'Baixar e mesclar mudancas do remoto',
    tags: ['basico', 'remote'],
    category: 'Remote'
  },
  {
    id: 'git-branch',
    command: 'git branch <nome>',
    description: 'Criar nova branch',
    example: 'git branch feature/nova-funcionalidade',
    tags: ['branch', 'workflow'],
    category: 'Branches'
  },
  {
    id: 'git-checkout',
    command: 'git checkout <branch>',
    description: 'Trocar de branch',
    example: 'git checkout main',
    tags: ['branch', 'navegacao'],
    category: 'Branches'
  },
  {
    id: 'git-merge',
    command: 'git merge <branch>',
    description: 'Mesclar branch atual com outra',
    example: 'git merge feature/nova-funcionalidade',
    tags: ['branch', 'merge'],
    category: 'Branches'
  },
  {
    id: 'git-stash',
    command: 'git stash',
    description: 'Salvar mudancas temporariamente',
    tags: ['avancado', 'stash'],
    category: 'Avancado'
  },
  {
    id: 'git-reset',
    command: 'git reset --hard HEAD~1',
    description: 'Desfazer ultimo commit (CUIDADO!)',
    warning: 'Comando destrutivo - pode perder codigo',
    tags: ['avancado', 'reset'],
    category: 'Avancado'
  }
];

export const tools: Tool[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'AI Tools',
    description: 'Assistente de codigo com IA da OpenAI',
    url: 'https://github.com/features/copilot',
    tags: ['ia', 'produtividade', 'vscode'],
    free: false,
    rating: 5,
    notes: 'Essencial para acelerar desenvolvimento. Sempre revisar codigo gerado.'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Tools',
    description: 'Assistente de IA para programacao e resolucao de problemas',
    url: 'https://chat.openai.com',
    tags: ['ia', 'debug', 'aprendizado'],
    free: true,
    rating: 5
  },
  {
    id: 'coolors',
    name: 'Coolors',
    category: 'Design',
    description: 'Gerador de paletas de cores',
    url: 'https://coolors.co',
    tags: ['cores', 'design', 'ui'],
    free: true,
    rating: 4
  },
  {
    id: 'react-devtools',
    name: 'React Developer Tools',
    category: 'Browser Extensions',
    description: 'Extensao para debug de aplicacoes React',
    url: 'https://chrome.google.com/webstore/detail/react-developer-tools',
    tags: ['react', 'debug', 'chrome'],
    free: true,
    rating: 5
  },
  {
    id: 'json-viewer',
    name: 'JSON Viewer',
    category: 'Browser Extensions',
    description: 'Visualizador de JSON formatado no navegador',
    url: 'https://chrome.google.com/webstore/detail/json-viewer',
    tags: ['json', 'api', 'debug'],
    free: true,
    rating: 4
  }
];

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'html-css',
    tech: 'HTML & CSS',
    status: 'completed',
    progress: 100,
    startDate: '2022-01-01',
    endDate: '2022-06-01',
    category: 'Frontend',
    resources: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { name: 'CSS Tricks', url: 'https://css-tricks.com' }
    ]
  },
  {
    id: 'javascript',
    tech: 'JavaScript',
    status: 'completed',
    progress: 100,
    startDate: '2022-06-01',
    endDate: '2023-01-01',
    category: 'Frontend',
    resources: [
      { name: 'JavaScript.info', url: 'https://javascript.info' },
      { name: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net' }
    ]
  },
  {
    id: 'react',
    tech: 'React.js',
    status: 'completed',
    progress: 100,
    startDate: '2023-01-01',
    endDate: '2023-08-01',
    category: 'Frontend',
    resources: [
      { name: 'React Docs', url: 'https://react.dev' },
      { name: 'React Router', url: 'https://reactrouter.com' }
    ]
  },
  {
    id: 'typescript',
    tech: 'TypeScript',
    status: 'completed',
    progress: 100,
    startDate: '2023-06-01',
    endDate: '2024-01-01',
    category: 'Frontend',
    resources: [
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs' }
    ]
  },
  {
    id: 'nodejs',
    tech: 'Node.js',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-01',
    endDate: '2024-03-01',
    category: 'Backend',
    resources: [
      { name: 'Node.js Docs', url: 'https://nodejs.org/docs' },
      { name: 'Express.js', url: 'https://expressjs.com' }
    ]
  },
  {
    id: 'docker',
    tech: 'Docker',
    status: 'learning',
    progress: 60,
    startDate: '2024-06-01',
    category: 'DevOps',
    resources: [
      { name: 'Docker Docs', url: 'https://docs.docker.com' },
      { name: 'Docker Compose', url: 'https://docs.docker.com/compose' }
    ]
  },
  {
    id: 'nextjs',
    tech: 'Next.js',
    status: 'learning',
    progress: 40,
    startDate: '2024-08-01',
    category: 'Frontend',
    resources: [
      { name: 'Next.js Docs', url: 'https://nextjs.org/docs' }
    ]
  },
  {
    id: 'python',
    tech: 'Python',
    status: 'learning',
    progress: 30,
    startDate: '2024-10-01',
    category: 'Backend',
    resources: [
      { name: 'Python.org', url: 'https://python.org' },
      { name: 'Real Python', url: 'https://realpython.com' }
    ]
  },
  {
    id: 'kubernetes',
    tech: 'Kubernetes',
    status: 'planned',
    progress: 0,
    startDate: '2025-03-01',
    category: 'DevOps',
    resources: [
      { name: 'Kubernetes Docs', url: 'https://kubernetes.io/docs' }
    ]
  },
  {
    id: 'aws',
    tech: 'AWS',
    status: 'planned',
    progress: 0,
    startDate: '2025-06-01',
    category: 'Cloud',
    resources: [
      { name: 'AWS Docs', url: 'https://docs.aws.amazon.com' }
    ]
  }
];

export const snippets: Snippet[] = [
  {
    id: 'react-useeffect',
    title: 'useEffect com cleanup',
    language: 'typescript',
    code: `useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`,
    description: 'Hook useEffect com funcao de limpeza para event listeners',
    tags: ['react', 'hooks', 'cleanup'],
    category: 'React'
  },
  {
    id: 'fetch-async',
    title: 'Fetch com async/await',
    language: 'typescript',
    code: `const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};`,
    description: 'Funcao para fazer requisicoes HTTP com tratamento de erro',
    tags: ['javascript', 'api', 'async'],
    category: 'JavaScript'
  }
];

export const cheatSheets: CheatSheet[] = [
  {
    id: 'git',
    title: 'Git Essentials',
    description: 'Comandos Git fundamentais para desenvolvimento',
    category: 'Version Control',
    tags: ['git', 'vcs', 'workflow'],
    lastUpdated: '2025-01-04',
    commands: gitCommands
  }
];