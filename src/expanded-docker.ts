export const dockerCommands = [
  // Ciclo de Vida do Container
  {
    id: 'docker-build',
    command: 'docker build -t nome-imagem .',
    description: 'Construir imagem a partir do Dockerfile',
    example: 'docker build -t minha-app:latest .',
    tags: ['básico', 'build', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },
  {
    id: 'docker-run-detached',
    command: 'docker run -d -p 3000:3000 --name meu-app nome-imagem',
    description: 'Executar container em background (-d) mapeando portas',
    example: 'docker run -d -p 3000:3000 --name minha-app node:18',
    tags: ['básico', 'run', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },
  {
    id: 'docker-ps',
    command: 'docker ps',
    description: 'Listar containers ativos (docker ps -a lista todos)',
    example: 'docker ps -a (incluir parados)',
    tags: ['básico', 'ps', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },
  {
    id: 'docker-stop',
    command: 'docker stop <id>',
    description: 'Parar container em execução',
    example: 'docker stop meu-container',
    tags: ['básico', 'stop', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },
  {
    id: 'docker-rm',
    command: 'docker rm <id>',
    description: 'Remover container parado',
    example: 'docker rm meu-container',
    tags: ['básico', 'rm', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },
  {
    id: 'docker-rmi',
    command: 'docker rmi <imagem>',
    description: 'Remover imagem do sistema',
    example: 'docker rmi minha-app:latest',
    tags: ['básico', 'rmi', 'ciclo-vida'],
    category: 'Ciclo de Vida'
  },

  // Debugging e Manutenção
  {
    id: 'docker-logs',
    command: 'docker logs <id>',
    description: 'Ver output do console (essencial para debug)',
    example: 'docker logs -f meu-container (seguir logs)',
    tags: ['debug', 'logs', 'manutenção'],
    category: 'Debug e Manutenção'
  },
  {
    id: 'docker-exec',
    command: 'docker exec -it <id> sh',
    description: 'Entrar no terminal do container rodando',
    example: 'docker exec -it meu-container bash',
    tags: ['debug', 'exec', 'terminal'],
    category: 'Debug e Manutenção'
  },
  {
    id: 'docker-system-prune',
    command: 'docker system prune -a',
    description: 'Limpeza geral (remove containers parados, redes não usadas e imagens soltas)',
    warning: 'Remove TODOS os recursos não utilizados',
    tags: ['manutenção', 'limpeza', 'system'],
    category: 'Debug e Manutenção'
  },

  // Docker Compose (Orquestração Local)
  {
    id: 'docker-compose-up',
    command: 'docker-compose up -d',
    description: 'Subir todos os serviços definidos no docker-compose.yml',
    example: 'docker-compose up -d (em background)',
    tags: ['compose', 'up', 'orquestração'],
    category: 'Docker Compose'
  },
  {
    id: 'docker-compose-down',
    command: 'docker-compose down',
    description: 'Parar e remover containers e redes',
    tags: ['compose', 'down', 'orquestração'],
    category: 'Docker Compose'
  },
  {
    id: 'docker-compose-logs',
    command: 'docker-compose logs -f',
    description: 'Acompanhar logs de todos os serviços em tempo real',
    tags: ['compose', 'logs', 'debug'],
    category: 'Docker Compose'
  },

  // Comandos Úteis Adicionais
  {
    id: 'docker-pull',
    command: 'docker pull <imagem>',
    description: 'Baixar imagem do registry',
    example: 'docker pull nginx:latest',
    tags: ['básico', 'pull'],
    category: 'Imagens'
  },
  {
    id: 'docker-images',
    command: 'docker images',
    description: 'Listar todas as imagens locais',
    tags: ['básico', 'images'],
    category: 'Imagens'
  },
  {
    id: 'docker-inspect',
    command: 'docker inspect <container>',
    description: 'Obter informações detalhadas do container',
    example: 'docker inspect meu-container',
    tags: ['debug', 'inspect', 'informações'],
    category: 'Debug e Manutenção'
  },
  {
    id: 'docker-stats',
    command: 'docker stats',
    description: 'Monitorar uso de recursos dos containers em tempo real',
    tags: ['monitoramento', 'stats', 'recursos'],
    category: 'Debug e Manutenção'
  }
];