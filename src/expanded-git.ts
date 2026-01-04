export const gitCommands = [
  // Configuração e Início
  {
    id: 'git-init',
    command: 'git init',
    description: 'Inicializar repositório Git - A máquina do tempo do projeto',
    example: 'git init meu-projeto',
    tags: ['básico', 'inicialização'],
    category: 'Configuração e Início'
  },
  {
    id: 'git-clone',
    command: 'git clone <url>',
    description: 'Clonar repositório remoto',
    example: 'git clone https://github.com/user/repo.git',
    tags: ['básico', 'clone'],
    category: 'Configuração e Início'
  },
  {
    id: 'git-config-name',
    command: 'git config --global user.name "Seu Nome"',
    description: 'Configurar nome do usuário globalmente',
    example: 'git config --global user.name "André Narcizo"',
    tags: ['configuração', 'setup'],
    category: 'Configuração e Início'
  },
  {
    id: 'git-config-email',
    command: 'git config --global user.email "seu@email.com"',
    description: 'Configurar email do usuário globalmente',
    example: 'git config --global user.email "andre@email.com"',
    tags: ['configuração', 'setup'],
    category: 'Configuração e Início'
  },

  // O Ciclo Diário (The Loop)
  {
    id: 'git-status',
    command: 'git status',
    description: 'O comando mais importante - Mostra o estado atual do repositório',
    tags: ['básico', 'status', 'ciclo-diário'],
    category: 'Ciclo Diário'
  },
  {
    id: 'git-add',
    command: 'git add <arquivo>',
    description: 'Adicionar mudanças ao stage (área de preparação)',
    example: 'git add . (todos os arquivos) ou git add src/App.js',
    tags: ['básico', 'staging', 'ciclo-diário'],
    category: 'Ciclo Diário'
  },
  {
    id: 'git-commit',
    command: 'git commit -m "mensagem"',
    description: 'Fazer commit com mensagem semântica',
    example: 'git commit -m "feat: adiciona autenticação JWT"',
    tags: ['básico', 'commit', 'ciclo-diário'],
    category: 'Ciclo Diário'
  },
  {
    id: 'git-push',
    command: 'git push origin <branch>',
    description: 'Enviar commits para repositório remoto',
    example: 'git push origin main',
    tags: ['básico', 'remote', 'ciclo-diário'],
    category: 'Ciclo Diário'
  },
  {
    id: 'git-pull',
    command: 'git pull',
    description: 'Atualizar repositório local com mudanças do remoto',
    tags: ['básico', 'remote', 'ciclo-diário'],
    category: 'Ciclo Diário'
  },

  // Branching e Merging (Estratégia)
  {
    id: 'git-branch',
    command: 'git branch',
    description: 'Listar todas as branches do repositório',
    example: 'git branch -a (incluir remotas)',
    tags: ['branch', 'workflow', 'estratégia'],
    category: 'Branching e Merging'
  },
  {
    id: 'git-checkout-new',
    command: 'git checkout -b <nome>',
    description: 'Criar e mudar para uma nova branch',
    example: 'git checkout -b feature/nova-funcionalidade',
    tags: ['branch', 'workflow', 'estratégia'],
    category: 'Branching e Merging'
  },
  {
    id: 'git-switch',
    command: 'git switch <nome>',
    description: 'Maneira moderna de trocar de branch',
    example: 'git switch main',
    tags: ['branch', 'navegação', 'moderno'],
    category: 'Branching e Merging'
  },
  {
    id: 'git-merge',
    command: 'git merge <branch>',
    description: 'Fundir a branch especificada na atual',
    example: 'git merge feature/nova-funcionalidade',
    tags: ['branch', 'merge', 'estratégia'],
    category: 'Branching e Merging'
  },

  // Comandos "Salva-Vidas" (Avançado)
  {
    id: 'git-stash',
    command: 'git stash',
    description: 'Guardar mudanças temporárias sem comitar (útil para trocar de branch rápido)',
    tags: ['avançado', 'stash', 'salva-vidas'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-stash-pop',
    command: 'git stash pop',
    description: 'Recuperar o que foi guardado no stash',
    tags: ['avançado', 'stash', 'salva-vidas'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-log-graph',
    command: 'git log --oneline --graph',
    description: 'Visualização limpa do histórico de commits',
    tags: ['avançado', 'log', 'visualização'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-reset-soft',
    command: 'git reset --soft HEAD~1',
    description: 'Desfazer último commit mantendo os arquivos (útil para corrigir erros)',
    warning: 'Use com cuidado - modifica o histórico',
    tags: ['avançado', 'reset', 'salva-vidas'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-cherry-pick',
    command: 'git cherry-pick <hash>',
    description: 'Aplicar commit específico de outra branch (cirúrgico)',
    example: 'git cherry-pick abc123',
    tags: ['avançado', 'cherry-pick', 'salva-vidas'],
    category: 'Comandos Salva-Vidas'
  },

  // Comandos adicionais úteis
  {
    id: 'git-fetch',
    command: 'git fetch',
    description: 'Baixar mudanças sem mesclar automaticamente',
    tags: ['remote', 'fetch'],
    category: 'Remote'
  },
  {
    id: 'git-rebase',
    command: 'git rebase <branch>',
    description: 'Reescrever histórico de commits',
    example: 'git rebase main',
    warning: 'Pode reescrever histórico - usar com cuidado',
    tags: ['avançado', 'rebase'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-restore',
    command: 'git restore <arquivo>',
    description: 'Restaurar arquivo para último commit',
    example: 'git restore src/App.js',
    tags: ['avançado', 'restore'],
    category: 'Comandos Salva-Vidas'
  },
  {
    id: 'git-revert',
    command: 'git revert <commit>',
    description: 'Reverter commit criando novo commit',
    example: 'git revert abc123',
    tags: ['avançado', 'revert'],
    category: 'Comandos Salva-Vidas'
  }
];