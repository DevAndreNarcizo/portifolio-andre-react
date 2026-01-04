import { gitCommands } from './expanded-git';
import { sqlCommands } from './expanded-sql';
import { dockerCommands } from './expanded-docker';
import { vscodeCommands } from './vscode-shortcuts';
import { roadmapItems } from './expanded-roadmap';
import { expandedTools as tools } from './expanded-tools';

export { gitCommands, sqlCommands, dockerCommands, vscodeCommands, roadmapItems, tools };

export const cheatSheets = [
  {
    id: 'git',
    title: 'Git Essentials',
    description: 'Comandos Git fundamentais - A máquina do tempo do projeto',
    category: 'Controle de Versão',
    tags: ['git', 'vcs', 'workflow'],
    lastUpdated: '2025-01-04',
    commands: gitCommands
  },
  {
    id: 'sql',
    title: 'SQL Reference',
    description: 'Comandos SQL essenciais - Focado em DML e DQL para Backend',
    category: 'Banco de Dados',
    tags: ['sql', 'database', 'query'],
    lastUpdated: '2025-01-04',
    commands: sqlCommands
  },
  {
    id: 'docker',
    title: 'Docker Commands',
    description: 'Containerização - Para garantir que "funciona na minha máquina" = "funciona em produção"',
    category: 'DevOps',
    tags: ['docker', 'container', 'devops'],
    lastUpdated: '2025-01-04',
    commands: dockerCommands
  },
  {
    id: 'vscode',
    title: 'VS Code Shortcuts',
    description: 'Atalhos do VS Code - A velocidade de desenvolvimento está ligada a evitar o mouse',
    category: 'Produtividade',
    tags: ['vscode', 'shortcuts', 'produtividade'],
    lastUpdated: '2025-01-04',
    commands: vscodeCommands
  }
];

// Importar dados expandidos
export { snippets } from './expanded-snippets';
export { adrs } from './adrs-data';
export { guides } from './guides-data';