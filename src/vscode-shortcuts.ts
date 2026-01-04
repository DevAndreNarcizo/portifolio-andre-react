export const vscodeCommands = [
  // Navegação e Comando
  {
    id: 'vscode-command-palette',
    command: 'Ctrl + Shift + P (Win/Linux) | Cmd + Shift + P (Mac)',
    description: 'Command Palette - O centro de comando de tudo',
    tags: ['navegação', 'comando', 'essencial'],
    category: 'Navegação Essencial'
  },
  {
    id: 'vscode-go-to-file',
    command: 'Ctrl + P (Win/Linux) | Cmd + P (Mac)',
    description: 'Go to File - Navegação rápida entre arquivos',
    tags: ['navegação', 'arquivo', 'essencial'],
    category: 'Navegação Essencial'
  },
  {
    id: 'vscode-find-in-files',
    command: 'Ctrl + Shift + F (Win/Linux) | Cmd + Shift + F (Mac)',
    description: 'Find in Files - Busca global no projeto',
    tags: ['busca', 'projeto', 'essencial'],
    category: 'Navegação Essencial'
  },

  // Edição Avançada
  {
    id: 'vscode-multi-cursor',
    command: 'Alt + Click (Win/Linux) | Opt + Click (Mac)',
    description: 'Multi-Cursor - Edita várias linhas ao mesmo tempo',
    tags: ['edição', 'multi-cursor', 'produtividade'],
    category: 'Edição Avançada'
  },
  {
    id: 'vscode-duplicate-line',
    command: 'Shift + Alt + Down (Win/Linux) | Shift + Opt + Down (Mac)',
    description: 'Duplicar Linha - Copia a linha atual para baixo',
    tags: ['edição', 'duplicar', 'produtividade'],
    category: 'Edição Avançada'
  },
  {
    id: 'vscode-move-line',
    command: 'Alt + Up/Down (Win/Linux) | Opt + Up/Down (Mac)',
    description: 'Mover Linha - Move a linha de código para cima/baixo',
    tags: ['edição', 'mover', 'produtividade'],
    category: 'Edição Avançada'
  },
  {
    id: 'vscode-comment',
    command: 'Ctrl + ; (Win/Linux) | Cmd + ; (Mac)',
    description: 'Comentar - Comenta/Descomenta o bloco selecionado',
    tags: ['edição', 'comentário', 'básico'],
    category: 'Edição Avançada'
  },

  // Terminal e Debug
  {
    id: 'vscode-terminal',
    command: 'Ctrl + ` (Win/Linux) | Cmd + ` (Mac)',
    description: 'Terminal - Abre/Fecha o terminal integrado',
    tags: ['terminal', 'desenvolvimento', 'essencial'],
    category: 'Terminal e Debug'
  },
  {
    id: 'vscode-debug',
    command: 'F5',
    description: 'Iniciar Debug - Executa o debugger',
    tags: ['debug', 'execução'],
    category: 'Terminal e Debug'
  },
  {
    id: 'vscode-breakpoint',
    command: 'F9',
    description: 'Toggle Breakpoint - Adiciona/Remove ponto de parada',
    tags: ['debug', 'breakpoint'],
    category: 'Terminal e Debug'
  },

  // Seleção e Busca
  {
    id: 'vscode-select-all-occurrences',
    command: 'Ctrl + Shift + L (Win/Linux) | Cmd + Shift + L (Mac)',
    description: 'Selecionar todas as ocorrências da palavra atual',
    tags: ['seleção', 'busca', 'edição'],
    category: 'Seleção e Busca'
  },
  {
    id: 'vscode-find-replace',
    command: 'Ctrl + H (Win/Linux) | Cmd + H (Mac)',
    description: 'Find and Replace - Buscar e substituir no arquivo',
    tags: ['busca', 'substituir', 'edição'],
    category: 'Seleção e Busca'
  },
  {
    id: 'vscode-select-word',
    command: 'Ctrl + D (Win/Linux) | Cmd + D (Mac)',
    description: 'Selecionar próxima ocorrência da palavra',
    tags: ['seleção', 'palavra', 'edição'],
    category: 'Seleção e Busca'
  },

  // Layout e Interface
  {
    id: 'vscode-sidebar',
    command: 'Ctrl + B (Win/Linux) | Cmd + B (Mac)',
    description: 'Toggle Sidebar - Mostra/Esconde a barra lateral',
    tags: ['interface', 'layout', 'espaço'],
    category: 'Layout e Interface'
  },
  {
    id: 'vscode-split-editor',
    command: 'Ctrl + \\ (Win/Linux) | Cmd + \\ (Mac)',
    description: 'Split Editor - Divide o editor em painéis',
    tags: ['layout', 'split', 'painéis'],
    category: 'Layout e Interface'
  },
  {
    id: 'vscode-zen-mode',
    command: 'Ctrl + K Z (Win/Linux) | Cmd + K Z (Mac)',
    description: 'Zen Mode - Modo foco sem distrações',
    tags: ['foco', 'zen', 'interface'],
    category: 'Layout e Interface'
  },

  // Formatação e Refatoração
  {
    id: 'vscode-format-document',
    command: 'Shift + Alt + F (Win/Linux) | Shift + Opt + F (Mac)',
    description: 'Format Document - Formatar todo o documento',
    tags: ['formatação', 'código', 'limpeza'],
    category: 'Formatação'
  },
  {
    id: 'vscode-format-selection',
    command: 'Ctrl + K Ctrl + F (Win/Linux) | Cmd + K Cmd + F (Mac)',
    description: 'Format Selection - Formatar apenas a seleção',
    tags: ['formatação', 'seleção', 'código'],
    category: 'Formatação'
  },
  {
    id: 'vscode-rename-symbol',
    command: 'F2',
    description: 'Rename Symbol - Renomear variável/função em todo o projeto',
    tags: ['refatoração', 'renomear', 'símbolo'],
    category: 'Refatoração'
  },

  // Git Integration
  {
    id: 'vscode-git-panel',
    command: 'Ctrl + Shift + G (Win/Linux) | Cmd + Shift + G (Mac)',
    description: 'Git Panel - Abrir painel de controle Git',
    tags: ['git', 'versionamento', 'painel'],
    category: 'Git Integration'
  },
  {
    id: 'vscode-git-commit',
    command: 'Ctrl + Enter (no Git panel)',
    description: 'Quick Commit - Commit rápido das mudanças',
    tags: ['git', 'commit', 'rápido'],
    category: 'Git Integration'
  }
];