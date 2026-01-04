# Knowledge Base - Documentação

## 🎯 Visão Geral

A Knowledge Base é uma seção do portfólio que centraliza conhecimento, ferramentas e recursos para desenvolvimento. Inclui cheatsheets, roadmap de aprendizado, ferramentas curadas e snippets de código.

## 🚀 Instalação

```bash
# Instalar dependências
chmod +x setup-knowledge.sh
./setup-knowledge.sh

# Ou manualmente:
npm install react-router-dom lucide-react fuse.js prismjs
npm install -D @types/prismjs
```

## 📁 Estrutura de Arquivos

```
src/
├── knowledge-types.ts      # Interfaces TypeScript
├── knowledge-data.ts       # Base de dados
└── components/
    ├── KnowledgeHome.tsx   # Dashboard principal
    ├── CheatSheets.tsx     # Página de cheatsheets
    ├── Tools.tsx           # Página de ferramentas
    ├── Roadmap.tsx         # Timeline de aprendizado
    ├── CommandCard.tsx     # Componente para comandos
    └── ToolCard.tsx        # Componente para ferramentas
```

## 🛠️ Como Adicionar Conteúdo

### Novos Comandos Git

Edite `src/knowledge-data.ts`:

```typescript
export const gitCommands: Command[] = [
  // ... comandos existentes
  {
    id: 'novo-comando',
    command: 'git novo-comando',
    description: 'Descrição do comando',
    example: 'git novo-comando --flag',
    tags: ['tag1', 'tag2'],
    category: 'Categoria'
  }
];
```

### Novas Ferramentas

```typescript
export const tools: Tool[] = [
  // ... ferramentas existentes
  {
    id: 'nova-ferramenta',
    name: 'Nome da Ferramenta',
    category: 'Categoria',
    description: 'Descrição da ferramenta',
    url: 'https://exemplo.com',
    tags: ['tag1', 'tag2'],
    free: true,
    rating: 5,
    notes: 'Notas adicionais'
  }
];
```

### Itens do Roadmap

```typescript
export const roadmapItems: RoadmapItem[] = [
  // ... itens existentes
  {
    id: 'nova-tech',
    tech: 'Nova Tecnologia',
    status: 'learning', // 'completed' | 'learning' | 'planned'
    progress: 50,
    startDate: '2025-01-01',
    category: 'Frontend',
    resources: [
      { name: 'Documentação', url: 'https://docs.exemplo.com' }
    ]
  }
];
```

## 🎨 Customização de Estilos

Cada componente tem seu próprio arquivo CSS:

- `CommandCard.css` - Estilos dos cards de comando
- `ToolCard.css` - Estilos dos cards de ferramenta
- `KnowledgeHome.css` - Dashboard principal
- `CheatSheets.css` - Página de cheatsheets
- `Tools.css` - Página de ferramentas
- `Roadmap.css` - Timeline do roadmap

## 🔍 Funcionalidades

### Busca
- Busca em tempo real nos comandos e ferramentas
- Filtros por categoria
- Filtro por ferramentas gratuitas

### Copy to Clipboard
- Todos os comandos têm botão de copiar
- Feedback visual ao copiar
- Funciona em mobile

### Timeline Visual
- Roadmap com progresso visual
- Status colorido (concluído, estudando, planejado)
- Links para recursos de estudo

## 📱 Responsividade

- Design mobile-first
- Grid adaptativo
- Navegação otimizada para touch
- Sidebar collapsible em telas pequenas

## 🚀 Deploy

A Knowledge Base é integrada ao portfólio principal. Para deploy:

```bash
npm run build
```

O build incluirá automaticamente todas as rotas da Knowledge Base.

## 🔧 Troubleshooting

### Erro de Roteamento
Se as rotas não funcionarem, verifique se o `BrowserRouter` está configurado corretamente no `App.tsx`.

### Estilos não Carregando
Certifique-se de que todos os arquivos CSS estão sendo importados nos componentes.

### Dependências Faltando
Execute o script de setup novamente:
```bash
./setup-knowledge.sh
```

## 📈 Próximos Passos

- [ ] Adicionar mais cheatsheets (SQL, Docker, Python)
- [ ] Implementar busca global (Cmd/Ctrl + K)
- [ ] Adicionar seção de snippets
- [ ] Criar ADRs (Architecture Decision Records)
- [ ] Adicionar guias e tutoriais autorais
- [ ] Implementar dark mode
- [ ] Adicionar analytics de uso