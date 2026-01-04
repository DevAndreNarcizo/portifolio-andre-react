export const guides = [
  {
    id: 'react-performance',
    title: 'Guia Completo: Otimizacao de Performance em React',
    description: 'Tecnicas avancadas para otimizar aplicacoes React',
    category: 'React',
    tags: ['react', 'performance', 'optimization'],
    lastUpdated: '2025-01-04',
    readTime: '15 min',
    content: `
# Guia Completo: Otimizacao de Performance em React

## 1. Identificando Problemas de Performance

### React DevTools Profiler
- Instalar React DevTools
- Usar aba Profiler para medir renders
- Identificar componentes lentos
- Analisar flame graphs

### Metricas importantes:
- **Render time**: Tempo para renderizar
- **Commit time**: Tempo para aplicar mudancas
- **Re-renders**: Quantas vezes renderiza

## 2. Tecnicas de Otimizacao

### 2.1 React.memo
\`\`\`typescript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return <div>{/* renderizacao pesada */}</div>;
}, (prevProps, nextProps) => {
  // Comparacao customizada
  return prevProps.data.id === nextProps.data.id;
});
\`\`\`

### 2.2 useMemo para calculos pesados
\`\`\`typescript
const ExpensiveCalculation = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => {
      // Calculo complexo
      return acc + item.value * item.multiplier;
    }, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};
\`\`\`

### 2.3 useCallback para funcoes
\`\`\`typescript
const ParentComponent = ({ items }) => {
  const handleItemClick = useCallback((id) => {
    // Logica do click
    updateItem(id);
  }, [updateItem]);

  return (
    <div>
      {items.map(item => (
        <ChildComponent 
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};
\`\`\`

## 3. Code Splitting e Lazy Loading

### 3.1 Lazy Loading de Componentes
\`\`\`typescript
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <LazyComponent />
  </Suspense>
);
\`\`\`

### 3.2 Route-based Code Splitting
\`\`\`typescript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Suspense>
);
\`\`\`

## 4. Virtualizacao para Listas Grandes

### 4.1 React Window
\`\`\`typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        {data[index].name}
      </div>
    )}
  </List>
);
\`\`\`

## 5. Otimizacao de Bundle

### 5.1 Analise do Bundle
\`\`\`bash
# Vite Bundle Analyzer
npm install --save-dev rollup-plugin-visualizer
\`\`\`

### 5.2 Tree Shaking
\`\`\`typescript
// ❌ Importa toda a biblioteca
import _ from 'lodash';

// ✅ Importa apenas o necessario
import { debounce } from 'lodash';
\`\`\`

## 6. Checklist de Performance

- [ ] Usar React.memo em componentes puros
- [ ] Implementar useMemo para calculos pesados
- [ ] Usar useCallback para funcoes passadas como props
- [ ] Implementar lazy loading para rotas
- [ ] Virtualizar listas grandes (>100 items)
- [ ] Otimizar imagens (WebP, lazy loading)
- [ ] Minimizar re-renders desnecessarios
- [ ] Usar keys estáveis em listas
- [ ] Implementar error boundaries
- [ ] Monitorar bundle size
`
  },
  {
    id: 'git-workflow',
    title: 'Git Workflow: Boas Praticas para Equipes',
    description: 'Guia completo de Git Flow e boas praticas',
    category: 'Git',
    tags: ['git', 'workflow', 'team'],
    lastUpdated: '2025-01-04',
    readTime: '12 min',
    content: `
# Git Workflow: Boas Praticas para Equipes

## 1. Git Flow Strategy

### Branches Principais
- **main/master**: Codigo de producao
- **develop**: Integracao de features
- **feature/***: Novas funcionalidades
- **release/***: Preparacao para release
- **hotfix/***: Correcoes urgentes

### Fluxo Basico
\`\`\`bash
# Criar feature branch
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat: adicionar nova funcionalidade"

# Finalizar feature
git checkout develop
git pull origin develop
git merge feature/nova-funcionalidade
git push origin develop
git branch -d feature/nova-funcionalidade
\`\`\`

## 2. Conventional Commits

### Formato
\`\`\`
<tipo>[escopo opcional]: <descricao>

[corpo opcional]

[rodape opcional]
\`\`\`

### Tipos de Commit
- **feat**: Nova funcionalidade
- **fix**: Correcao de bug
- **docs**: Documentacao
- **style**: Formatacao (sem mudanca de logica)
- **refactor**: Refatoracao de codigo
- **test**: Adicionar/modificar testes
- **chore**: Tarefas de manutencao

### Exemplos
\`\`\`bash
git commit -m "feat(auth): adicionar login com Google"
git commit -m "fix(api): corrigir erro de validacao"
git commit -m "docs: atualizar README com instrucoes"
git commit -m "refactor(utils): simplificar funcao de formatacao"
\`\`\`

## 3. Pull Request Best Practices

### Template de PR
\`\`\`markdown
## Descricao
Breve descricao das mudancas

## Tipo de Mudanca
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentacao

## Como Testar
1. Fazer checkout da branch
2. Executar npm install
3. Executar npm test
4. Verificar funcionalidade X

## Checklist
- [ ] Codigo segue style guide
- [ ] Testes passando
- [ ] Documentacao atualizada
- [ ] Sem conflitos com main
\`\`\`

## 4. Comandos Avancados

### 4.1 Rebase Interativo
\`\`\`bash
# Limpar historico de commits
git rebase -i HEAD~3

# Opcoes no editor:
# pick = usar commit
# reword = editar mensagem
# edit = editar commit
# squash = juntar com anterior
# drop = remover commit
\`\`\`

### 4.2 Cherry Pick
\`\`\`bash
# Aplicar commit especifico
git cherry-pick abc123

# Cherry pick multiplos commits
git cherry-pick abc123 def456
\`\`\`

### 4.3 Bisect para Debug
\`\`\`bash
# Iniciar bisect
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Git vai sugerir commits para testar
# Marcar como good ou bad ate encontrar o problema
git bisect good  # ou bad
git bisect reset  # finalizar
\`\`\`

## 5. Hooks Uteis

### 5.1 Pre-commit Hook
\`\`\`bash
#!/bin/sh
# .git/hooks/pre-commit

# Executar linter
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint failed. Commit aborted."
  exit 1
fi

# Executar testes
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi
\`\`\`

### 5.2 Commit Message Hook
\`\`\`bash
#!/bin/sh
# .git/hooks/commit-msg

# Validar formato conventional commits
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
  echo "Commit message invalido!"
  echo "Use: tipo(escopo): descricao"
  exit 1
fi
\`\`\`

## 6. Resolucao de Conflitos

### 6.1 Merge Conflicts
\`\`\`bash
# Quando ocorre conflito
git status  # ver arquivos em conflito

# Editar arquivos manualmente ou usar ferramenta
git mergetool

# Apos resolver
git add .
git commit
\`\`\`

### 6.2 Ferramentas de Merge
- **VS Code**: Built-in merge editor
- **GitKraken**: Interface grafica
- **Meld**: Ferramenta visual Linux
- **P4Merge**: Ferramenta Perforce

## 7. Backup e Recuperacao

### 7.1 Reflog para Recuperacao
\`\`\`bash
# Ver historico de mudancas
git reflog

# Recuperar commit perdido
git checkout abc123
git branch recovered-branch
\`\`\`

### 7.2 Backup de Branches
\`\`\`bash
# Backup antes de operacao perigosa
git branch backup-branch

# Restaurar se necessario
git checkout backup-branch
\`\`\`
`
  },
  {
    id: 'docker-production',
    title: 'Docker para Producao: Guia Completo',
    description: 'Configuracao Docker otimizada para ambiente de producao',
    category: 'DevOps',
    tags: ['docker', 'production', 'devops'],
    lastUpdated: '2025-01-04',
    readTime: '20 min',
    content: `
# Docker para Producao: Guia Completo

## 1. Dockerfile Otimizado

### 1.1 Multi-stage Build
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Criar usuario nao-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copiar apenas arquivos necessarios
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

### 1.2 Otimizacoes de Imagem
\`\`\`dockerfile
# Use imagens Alpine (menores)
FROM node:18-alpine

# Instalar dependencias de sistema primeiro
RUN apk add --no-cache \
    ca-certificates \
    tzdata

# Definir timezone
ENV TZ=America/Sao_Paulo

# Usar .dockerignore
# .dockerignore:
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage
.nyc_output
\`\`\`

## 2. Docker Compose para Producao

### 2.1 Configuracao Completa
\`\`\`yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: production
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: \${DB_NAME}
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER}"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - static_files:/var/www/static
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  static_files:

networks:
  app-network:
    driver: bridge
\`\`\`

## 3. Configuracao Nginx

### 3.1 nginx.conf Otimizado
\`\`\`nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    server {
        listen 80;
        server_name example.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name example.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        # Static files
        location /static/ {
            alias /var/www/static/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API routes
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Main app
        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
\`\`\`

## 4. Monitoramento e Logs

### 4.1 Logging Centralizado
\`\`\`yaml
# docker-compose.yml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # ELK Stack para logs
  elasticsearch:
    image: elasticsearch:7.14.0
    environment:
      - discovery.type=single-node
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: logstash:7.14.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline

  kibana:
    image: kibana:7.14.0
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
\`\`\`

### 4.2 Health Checks
\`\`\`dockerfile
# No Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

\`\`\`javascript
// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
\`\`\`

## 5. Seguranca

### 5.1 Secrets Management
\`\`\`yaml
# docker-compose.yml
services:
  app:
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
\`\`\`

### 5.2 Network Security
\`\`\`yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Sem acesso externo

services:
  nginx:
    networks:
      - frontend
  
  app:
    networks:
      - frontend
      - backend
  
  db:
    networks:
      - backend  # Apenas rede interna
\`\`\`

## 6. Backup e Recuperacao

### 6.1 Backup Automatizado
\`\`\`bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Backup do banco
docker exec postgres_container pg_dump -U user dbname > $BACKUP_DIR/db_$DATE.sql

# Backup de volumes
docker run --rm -v postgres_data:/data -v $BACKUP_DIR:/backup alpine \
  tar czf /backup/volume_$DATE.tar.gz -C /data .

# Limpar backups antigos (manter 7 dias)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
\`\`\`

### 6.2 Cron Job para Backup
\`\`\`bash
# Adicionar ao crontab
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1
\`\`\`

## 7. Deploy e CI/CD

### 7.1 GitHub Actions
\`\`\`yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and push Docker image
        run: |
          docker build -t myapp:latest .
          docker tag myapp:latest registry.com/myapp:latest
          docker push registry.com/myapp:latest
      
      - name: Deploy to server
        run: |
          ssh user@server 'docker-compose pull && docker-compose up -d'
\`\`\`

## 8. Checklist de Producao

- [ ] Multi-stage build implementado
- [ ] Usuario nao-root configurado
- [ ] Health checks funcionando
- [ ] Logs centralizados
- [ ] Secrets gerenciados com seguranca
- [ ] SSL/TLS configurado
- [ ] Rate limiting implementado
- [ ] Backup automatizado
- [ ] Monitoramento ativo
- [ ] Resource limits definidos
- [ ] Network security configurada
- [ ] CI/CD pipeline funcionando
`
  }
];